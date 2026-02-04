import { motion } from "motion/react";

const dialogSteps = [
  {
    title: "Шаг 1. Клиент пишет боту",
    paragraphs: [
      "Клиент задаёт вопрос в Telegram: о стоимости, сроках, документах или ТН ВЭД.",
      "Бот сразу отвечает, уточняет детали и ведёт диалог дальше."
    ]
  },
  {
    title: "Шаг 2. Бот помогает составить заявку",
    paragraphs: [
      "Бот задаёт вопросы по чек-листу, как опытный менеджер: маршрут, тип груза, вес, объём, сроки, документы.",
      "Клиенту не нужно знать \"как правильно\" — бот сам ведёт его."
    ]
  },
  {
    title: "Шаг 3. Готовая заявка приходит менеджеру",
    paragraphs: [
      "Менеджер получает уже структурированную заявку: все данные + история переписки с клиентом.",
      "Без догадок, без повторных вопросов."
    ]
  },
  {
    title: "Шаг 4. Менеджер подключается, когда это действительно нужно",
    paragraphs: [
      "Менеджер отвечает уже тёплому клиенту и занимается продажей,",
      "а не перепиской и сбором данных."
    ]
  }
];

export function HowItWorks() {
  return (
    <section className="pt-16 pb-24 px-6 bg-gradient-to-b from-[#0B0F14] via-[#0C0C0C] to-[#101726] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 right-10 w-56 h-56 bg-[#00D1FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-6 w-40 h-40 bg-[#A7F5FF]/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,209,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Как работает AI-помощник в реальном диалоге
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Клиент общается с ботом как с живым менеджером. Бот уточняет детали, помогает составить заявку и передаёт её менеджеру с полным контекстом.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#0E1C2B]/80 via-[#0B121A]/70 to-[#0C0C0C]/80 border border-[#00D1FF]/10" />
          <div className="absolute inset-0 opacity-25 rounded-[32px]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,209,255,0.2) 1px, transparent 0)`,
                backgroundSize: "32px 32px"
              }}
            />
          </div>
          <div className="relative z-10 grid gap-8 md:grid-cols-2 p-8 md:p-10">
            {dialogSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group bg-[#1B1F2A]/50 backdrop-blur-sm border border-[#00D1FF]/20 rounded-3xl p-8 h-full hover:border-[#00D1FF]/40 transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
                  <span className="text-black font-semibold">{index + 1}</span>
                </div>

                <h3 className="text-2xl text-white mb-4">{step.title}</h3>
                <div className="space-y-3 text-gray-300">
                  {step.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-[#A7F5FF]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  whileHover={{
                    boxShadow: "0 0 40px rgba(0,209,255,0.1)"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
