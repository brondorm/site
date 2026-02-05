import { motion } from "motion/react";
import { Brain, Cpu, Zap } from "lucide-react";

export function WhyNow() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#0C0C0C] via-[#16213e] to-[#0C0C0C] relative overflow-hidden">

      {/* Animated Light Rays */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(0,209,255,0.1) 50%, transparent 70%)',
            'linear-gradient(225deg, transparent 30%, rgba(0,209,255,0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(0,209,255,0.1) 50%, transparent 70%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl text-white mb-8">
            AI уже стал вашим коллегой
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Мы живём в мире, где технологии помогают людям делать больше.
            Этот бот — не замена менеджерам, а инструмент, который усиливает их.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Brain,
              title: "Искусственный интеллект от OpenAI",
              description: "Мы используем новейшие LLM-модели, которые обеспечивают максимальную точность и результат."
            },
            {
              icon: Cpu,
              title: "Продвинутая обработка",
              description: "Понимает контекст и тон человеческого общения, отвечая естественно и точно."
            },
            {
              icon: Zap,
              title: "Мгновенная реакция",
              description: "Отвечает за секунды, создавая положительный опыт для ваших клиентов."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full group-hover:bg-white/10 group-hover:border-[#00D1FF]/30 transition-all duration-300">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-xl flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-6 h-6 text-black" />
                </motion.div>
                <h3 className="text-lg text-white mb-3 group-hover:text-[#A7F5FF] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/20 to-[#A7F5FF]/20 rounded-2xl blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative bg-[#1B1F2A]/80 backdrop-blur-sm border border-[#00D1FF]/30 rounded-2xl px-12 py-8">
              <motion.p 
                className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-white via-[#A7F5FF] to-[#00D1FF] bg-clip-text"
                style={{ lineHeight: 1.4 }}
              >
                "Будущее уже здесь, в каждом автоматизированном ответе."
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00D1FF] rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
}