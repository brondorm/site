import { motion } from "motion/react";
import { Clock, MessageCircle, Users, Shield } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Экономия до 60% времени на рутине",
    description: "Автоматические ответы на типовые вопросы освобождают менеджеров для важных задач",
    gradient: "from-[#00D1FF] to-[#0099CC]"
  },
  {
    icon: MessageCircle,
    title: "Быстрые и точные ответы 24/7",
    description: "Клиенты получают мгновенные ответы в любое время дня и ночи",
    gradient: "from-[#A7F5FF] to-[#00D1FF]"
  },
  {
    icon: Users,
    title: "Никаких ошибок при передаче клиента менеджеру",
    description: "Плавный переход от бота к живому специалисту с полным контекстом беседы",
    gradient: "from-[#00D1FF] to-[#66E0FF]"
  },
  {
    icon: Shield,
    title: "Безопасная обработка данных",
    description: "Вся информация обрабатывается в соответствии с современными стандартами безопасности",
    gradient: "from-[#66E0FF] to-[#A7F5FF]"
  }
];

export function Benefits() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#1B1F2A] to-[#0C0C0C] relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-[#00D1FF]/10 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-[#A7F5FF]/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Ценность и выгоды
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Каждая функция разработана для максимальной эффективности вашей команды
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-[#1B1F2A]/80 backdrop-blur-sm border border-[#00D1FF]/20 rounded-2xl p-8 h-full group-hover:border-[#00D1FF]/40 transition-all duration-300 relative overflow-hidden">
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, rgba(0,209,255,0.1) 0%, transparent 70%)`
                  }}
                />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <benefit.icon className="w-8 h-8 text-black" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl text-white mb-4 group-hover:text-[#A7F5FF] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(0,209,255,0.1), transparent)`,
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { value: "60%", label: "Экономия времени" },
            { value: "24/7", label: "Доступность" },
            { value: "100%", label: "Точность передачи" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-4xl md:text-5xl bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}