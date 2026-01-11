import { motion } from "motion/react";
import { MessageCircle, ClipboardList, FileText, UserCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Шаг 1. Клиент пишет боту",
    description: "Клиент задаёт вопрос в Telegram: о стоимости, сроках, документах или ТН ВЭД. Бот сразу отвечает, уточняет детали и ведёт диалог дальше.",
    number: "01"
  },
  {
    icon: ClipboardList,
    title: "Шаг 2. Бот помогает составить заявку",
    description: "Бот задаёт вопросы по чек-листу, как опытный менеджер: маршрут, тип груза, вес, объём, сроки, документы. Клиенту не нужно знать «как правильно» — бот сам ведёт его.",
    number: "02"
  },
  {
    icon: FileText,
    title: "Шаг 3. Готовая заявка приходит менеджеру",
    description: "Менеджер получает уже структурированную заявку: все данные + история переписки с клиентом. Без догадок, без повторных вопросов.",
    number: "03"
  },
  {
    icon: UserCheck,
    title: "Шаг 4. Менеджер подключается, когда это действительно нужно",
    description: "Менеджер отвечает уже тёплому клиенту и занимается продажей, а не перепиской и сбором данных.",
    number: "04"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-[#0C0C0C] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,209,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Как работает AI-помощник в реальном диалоге
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Клиент общается с ботом как с живым менеджером. Бот уточняет детали, помогает составить заявку и передаёт её менеджеру с полным контекстом.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-[#00D1FF]/50 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
                  viewport={{ once: true }}
                />
              )}

              <div className="relative z-10 bg-[#1B1F2A]/50 backdrop-blur-sm border border-[#00D1FF]/20 rounded-2xl p-8 h-full group-hover:border-[#00D1FF]/40 transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
                  <span className="text-black font-semibold">{step.number}</span>
                </div>

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-[#00D1FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00D1FF]/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-8 h-8 text-[#00D1FF]" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl text-white mb-4 group-hover:text-[#A7F5FF] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-[#A7F5FF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  whileHover={{
                    boxShadow: "0 0 40px rgba(0,209,255,0.1)"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#00D1FF] rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
