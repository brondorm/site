import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

const steps = [
  {
    title: "Разбираем процессы",
    text: "Смотрим, как устроена работа в вашей команде, и находим места, где ИИ уберёт рутину или сократит её в разы.",
  },
  {
    title: "Собираем ИИ-агента под задачу",
    text: "Решение проектируется под конкретный процесс и согласуется с вами.",
  },
  {
    title: "Вы экономите время и деньги",
    text: "Сотрудники занимаются тем, что действительно важно, а рутину ведёт агент.",
  },
];

export function HowItWorksSteps() {
  return (
    <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0C0C0C] via-[#0B0F14] to-[#101726] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 right-10 w-56 h-56 bg-[#00D1FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-6 w-40 h-40 bg-[#A7F5FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 mb-6 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-full">
            <span className="text-[#00D1FF]">Как это работает?</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white">
            От рутины к автоматизации — за три шага
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative group bg-[#1B1F2A]/50 backdrop-blur-sm border border-[#00D1FF]/20 rounded-3xl p-8 pt-10 h-full hover:border-[#00D1FF]/40 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
                <span className="text-black font-semibold">{index + 1}</span>
              </div>
              <h3 className="text-2xl text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black px-8 transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)]"
          >
            <Link to="/ai-manager">Подробнее</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
