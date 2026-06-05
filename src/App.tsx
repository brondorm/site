import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { ProblemSolution } from "./components/ProblemSolution";
import { HowItWorks } from "./components/HowItWorks";
import { ManagerPanel } from "./components/ManagerPanel";
import { Benefits } from "./components/Benefits";
import { WhyNow } from "./components/WhyNow";
import { FinalCTA } from "./components/FinalCTA";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { ThanksPage } from "./components/ThanksPage";
import { Home } from "./components/home/Home";
import { TurnkeyPage } from "./components/turnkey/TurnkeyPage";

// Лендинг продукта «ИИ менеджер» — конверсионная страница (минимум навигации).
function AiManagerPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden">
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <ManagerPanel />
      <Benefits />
      <WhyNow />
      <FinalCTA />
    </div>
  );
}

// При переходе на другую страницу прокручиваем наверх,
// иначе новая страница открывается на той же позиции скролла.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-manager" element={<AiManagerPage />} />
        <Route path="/custom" element={<TurnkeyPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
