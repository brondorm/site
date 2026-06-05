import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "../../lib/motion";

export function AboutUs() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#1B1F2A] via-[#0C0C0C] to-[#0C0C0C] relative overflow-hidden">
      {/* Фоновое свечение */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[500px] h-[60vw] max-h-[500px] bg-[#00D1FF]/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <h2
          className="text-5xl md:text-7xl mb-10 bg-gradient-to-r from-white via-[#A7F5FF] to-[#00D1FF] bg-clip-text text-transparent"
          style={{ lineHeight: 1.1 }}
        >
          Про нас
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed">
          Работая в крупных IT-компаниях, мы начали замечать, как много бизнес-процессов можно
          автоматизировать с помощью искусственного интеллекта. Так многие из нас начали путь
          внедрения новейших технологий в бизнес. Вскоре появился проект{" "}
          <span className="text-white">ClickToFuture</span>, который помогает внедрять решения не
          только IT-гигантам, но и малому и среднему бизнесу в России.
        </p>
      </motion.div>
    </section>
  );
}
