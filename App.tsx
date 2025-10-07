import { HeroSection } from "./components/HeroSection";
import { ProblemSolution } from "./components/ProblemSolution";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { WhyNow } from "./components/WhyNow";
import { FinalCTA } from "./components/FinalCTA";

export default function App() {
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