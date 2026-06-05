import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Header } from "../home/Header";
import { FinalCTA } from "../FinalCTA";
import { HowWeWorkSteps } from "./HowWeWorkSteps";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Герой страницы «Внедрение под ключ».
function TurnkeyHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pb-20 pt-28">
      {/* Фоновая сетка */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#00D1FF 1px, transparent 1px), linear-gradient(90deg, #00D1FF 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />
      {/* Glow-эффекты */}
      <motion.div
        className="absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-[#00D1FF]/10 blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#A7F5FF]/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-6 inline-block rounded-full border border-[#00D1FF]/30 bg-[#00D1FF]/10 px-4 py-2"
        >
          <span className="text-[#00D1FF]">Как мы работаем</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          className="bg-gradient-to-r from-white via-[#A7F5FF] to-[#00D1FF] bg-clip-text text-5xl text-transparent md:text-7xl"
          style={{ lineHeight: 1.1 }}
        >
          Внедряем ИИ в ваш бизнес под ключ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
          className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl"
        >
          Находим, где сотрудники тратят часы на рутину, и собираем систему, которая делает это за
          них. Вы получаете готовое решение и результат в цифрах, а не набор технологий, в которых
          нужно разбираться самому.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-[#00D1FF]/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Страница «Внедрение под ключ» (/custom). Полное меню — это страница-витрина,
// а не конверсионный лендинг.
export function TurnkeyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0C0C0C] text-white">
      <Header />
      <TurnkeyHero />
      <HowWeWorkSteps />
      <FinalCTA
        heading="Готовы автоматизировать рутину под ключ?"
        description="Разберём ваши процессы и покажем, что можно автоматизировать — с расчётом окупаемости ещё до старта работ."
        buttonLabel="Обсудить задачу"
      />
    </div>
  );
}
