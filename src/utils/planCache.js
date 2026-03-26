let cache = null;
const TTL = 5 * 60 * 1000; // 5 minutes

export async function checkIsPremium() {
  // ✅ If payment just happened, trust it immediately (handles Stripe webhook delay)
  if (sessionStorage.getItem("paymentJustCompleted") === "true") {
    sessionStorage.removeItem("paymentJustCompleted");
    cache = { isPremium: true, ts: Date.now() };
    return true;
  }

  // ✅ Return cached result if still fresh
  if (cache && Date.now() - cache.ts < TTL) return cache.isPremium;

  const userId = localStorage.getItem("userId");
  if (!userId) return false;

  try {
    const res = await fetch(`https://fotwo.bizmailo.com/api/auth/users/${userId}`);
    const data = await res.json();

    const isPremium = data.success && data.user?.plan === "premium";
    cache = { isPremium, ts: Date.now() };
    return isPremium;

  } catch {
    return false;
  }
}

export function clearPlanCache() {
  cache = null;
  
}