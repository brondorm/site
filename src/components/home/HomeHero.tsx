import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { fadeUp, staggerContainer } from "../../lib/motion";

// Парящие на фоне роботы (картинка из public/robot.png).
// mixBlendMode: "screen" убирает чёрный фон изображения — остаётся только свечение.
const robots = [
  { top: "15%", left: "8%", size: 110, duration: 7, delay: 0, rotate: -8 },
  { top: "60%", left: "12%", size: 80, duration: 9, delay: 1.5, rotate: 6 },
  { top: "22%", left: "82%", size: 95, duration: 8, delay: 0.8, rotate: 10 },
  { top: "68%", left: "85%", size: 70, duration: 10, delay: 2, rotate: -6 },
];

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Лёгкий параллакс: контент уезжает вверх и растворяется при скролле.
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const openLeadModal = () => window.dispatchEvent(new Event("openDemoModal"));

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Градиентный фон */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0C0C0C] via-[#1a1a2e] to-[#0C0C0C]" />

      {/* Анимированная сетка */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 209, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 209, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Парящие роботы */}
      {robots.map((r, i) => (
        <motion.img
          key={i}
          src="./robot.png"
          alt=""
          aria-hidden="true"
          className="absolute z-10 select-none pointer-events-none"
          style={{
            top: r.top,
            left: r.left,
            width: r.size,
            height: r.size,
            opacity: 0.35,
            mixBlendMode: "screen",
          }}
          animate={{ y: [0, -22, 0], rotate: [r.rotate, r.rotate + 4, r.rotate] }}
          transition={{
            duration: r.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: r.delay,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ))}

      {/* Контент */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#A7F5FF] to-[#00D1FF] bg-clip-text text-transparent"
          style={{ lineHeight: 1.1 }}
        >
          Находим процессы, которые съедают время сотрудников, и закрываем их с помощью ИИ
        </motion.h1>

        <motion.div variants={fadeUp}>
          <Button
            size="lg"
            onClick={openLeadModal}
            className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black px-12 py-6 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)]"
          >
            Получить бесплатный разбор процессов
          </Button>
          <p className="mt-4 text-sm text-gray-500">Действительно бесплатно =)</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
