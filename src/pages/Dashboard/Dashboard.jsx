import { useOutletContext } from "react-router-dom";
import Header from "./Header";
import PromptStudio from "./PromptStudio";
import WelcomeCard from "./WelcomeCard";

export default function Dashboard() {
  const { onMenuClick } = useOutletContext();

  return (
    <div className="flex min-h-screen font-helvetica">
      <div className="flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 lg:py-8">
        <Header onMenuClick={onMenuClick} />
        <PromptStudio />
        <WelcomeCard />
      </div>
    </div>
  );
}