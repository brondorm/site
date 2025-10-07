import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Mail, Phone, Shield } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0C0C0C] via-[#1B1F2A] to-[#0C0C0C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0,209,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(167,245,255,0.3) 0%, transparent 50%)
            `
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl text-white mb-8"
            style={{ lineHeight: 1.1 }}
          >
            Попробуй, как работает бот
          </motion.h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Протестируй демо и посмотри, как легко можно разгрузить свою команду.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black px-12 py-6 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)] group"
            >
              Запросить демо-доступ
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF]/10 hover:border-[#00D1FF] px-8 py-6 text-lg transition-all duration-300"
            >
              Смотреть видео-демо
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: Shield, text: "Безопасность данных гарантирована" },
            { icon: Phone, text: "Поддержка 24/7" },
            { icon: Mail, text: "Быстрая интеграция" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-400">
              <item.icon className="w-5 h-5 text-[#00D1FF]" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-6 h-6 bg-black rounded-sm" />
              </motion.div>
              <span className="text-2xl text-white">AI Assistant</span>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row gap-6 text-gray-400">
              <a href="#" className="hover:text-[#00D1FF] transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-[#00D1FF] transition-colors">
                Условия использования
              </a>
              <a href="#" className="hover:text-[#00D1FF] transition-colors">
                Контакты
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-500">
            <p>&copy; 2025 AI Assistant. Будущее клиентской поддержки.</p>
          </div>
        </motion.footer>
      </div>

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-[#00D1FF]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#A7F5FF]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
}