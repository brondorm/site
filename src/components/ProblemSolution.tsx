import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0C0C0C] to-[#1B1F2A]">
      <div className="max-w-6xl mx-auto">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-8">
            <span className="text-red-400">Проблема</span>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl text-white">
              Клиенты задают десятки однотипных вопросов каждый день
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Менеджеры утопают в вопросах. Клиенты ждут, а команда выгорает.
            </p>
            
            {/* Problem indicators */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span>60% рабочего времени уходит на рутину.</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span>Ответы повторяются, а важные задачи откладываются.</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span>Каждая минута ожидания — шанс для конкурента.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,209,255,0.4)] rotate-90"
          >
            <ArrowRight className="w-8 h-8 text-black" />
          </motion.div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-full mb-8 text-center">
            <span className="text-[#00D1FF]">Решение</span>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl text-white mb-8 text-center">
              Контур первичной обработки клиентов:
            </h2>
            <ul className="text-left text-xl text-gray-300 leading-relaxed space-y-4 max-w-3xl mx-auto">
              <li>
                <strong>Ответы на типовые вопросы</strong> по вашей базе знаний
              </li>
              <li>
                <strong>Сбор заявки по чек-листу</strong> (без потерь данных)
              </li>
              <li>
                <strong>Модуль ТН ВЭД</strong>: помогает клиенту и менеджеру быстрее пройти этап классификации
              </li>
              <li>
                <strong>Передача менеджеру с полным контекстом</strong>: переписка, заполненные поля заявки, статус
              </li>
            </ul>
          </div>

          {/* Glowing effect */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
