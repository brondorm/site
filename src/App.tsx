import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { ProblemSolution } from "./components/ProblemSolution";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { WhyNow } from "./components/WhyNow";
import { FinalCTA } from "./components/FinalCTA";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden">
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <Benefits />
      <WhyNow />
      <FinalCTA />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}