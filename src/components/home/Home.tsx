import { Header } from "./Header";
import { HomeHero } from "./HomeHero";
import { HowItWorksSteps } from "./HowItWorksSteps";
import { ChoosePath } from "./ChoosePath";
import { AboutUs } from "./AboutUs";
import { FinalCTA } from "../FinalCTA";

export function Home() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden">
      <Header />
      <HomeHero />
      <HowItWorksSteps />
      <ChoosePath />
      <AboutUs />
      <FinalCTA
        heading="Узнайте, что в вашем бизнесе можно автоматизировать уже сейчас"
        description="Бесплатный разбор процессов — без обязательств."
        buttonLabel="Получить разбор процессов"
      />
    </div>
  );
}
