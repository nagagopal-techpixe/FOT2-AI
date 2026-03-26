const BASE_URL = "https://fotwo.bizmailo.com";

export const PLAN_REQUIRED_EVENT = "plan:required";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // 🔹 Any 403 PLAN_REQUIRED anywhere in the app → fires modal
  if (res.status === 403) {
    const data = await res.json();
    if (data.code === "PLAN_REQUIRED") {
      window.dispatchEvent(new CustomEvent(PLAN_REQUIRED_EVENT));
      return null;
    }
  }

  return res;
}