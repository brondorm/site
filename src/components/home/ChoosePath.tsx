import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

export function ChoosePath() {
  // «Обсудить задачу» пока открывает форму захвата лида — отдельной страницы
  // «Внедрение под ключ» ещё нет (наполним позже).
  const openLeadModal = () => window.dispatchEvent(new Event("openDemoModal"));

  return (
    <section
      id="choose"
      className="py-24 px-6 bg-gradient-to-b from-[#101726] via-[#0C0C0C] to-[#1B1F2A] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white">Два способа начать</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Готовые продукты */}
          <motion.div
            variants={fadeUp}
            className="group flex flex-col bg-[#1B1F2A]/50 backdrop-blur-sm border border-[#00D1FF]/20 rounded-3xl p-8 hover:border-[#00D1FF]/40 transition-all duration-300"
          >
            <div className="w-14 h-14 mb-6 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
              <Package className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-2xl text-white mb-4">Готовые продукты</h3>
            <p className="text-gray-300 leading-relaxed mb-8 flex-1">
              Проверенные решения, которые внедряем за 12 дней. Например,{" "}
              <span className="text-[#00D1FF]">ИИ менеджер</span> — отвечает на типовые вопросы
              клиентов, собирает заявку по чек-листу и подключает человека только когда нужно.
            </p>
            <Button
              asChild
              size="lg"
              className="self-start bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
            >
              <Link to="/ai-manager">
                Смотреть продукт <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Внедрение под ключ */}
          <motion.div
            variants={fadeUp}
            className="group flex flex-col bg-[#1B1F2A]/50 backdrop-blur-sm border border-[#00D1FF]/20 rounded-3xl p-8 hover:border-[#00D1FF]/40 transition-all duration-300"
          >
            <div className="w-14 h-14 mb-6 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
              <Wrench className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-2xl text-white mb-4">Внедрение под ключ</h3>
            <p className="text-gray-300 leading-relaxed mb-8 flex-1">
              Если готового решения под вашу задачу нет — разбираем процесс и разрабатываем агента
              с нуля. От аудита до запуска.
            </p>
            <Button
              size="lg"
              onClick={openLeadModal}
              className="self-start bg-transparent border border-[#00D1FF]/40 text-[#00D1FF] hover:bg-[#00D1FF]/10 hover:border-[#00D1FF] transition-all duration-300"
            >
              Обсудить задачу <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
