import { motion } from "motion/react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0C0C0C] via-[#1a1a2e] to-[#0C0C0C]" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 209, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 209, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#A7F5FF] to-[#00D1FF] bg-clip-text text-transparent"
            style={{ lineHeight: 1.1 }}
          >
            Будущее клиентской поддержки уже здесь
          </motion.h1>
        </motion.div>

        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          AI-помощник для первой линии: отвечает на типовые вопросы, собирает заявку по чек-листу и подключает менеджера только когда нужно.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black px-12 py-6 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)]"
            onClick={() => window.open('https://t.me/ClickToFuture_bot', '_blank')}
          >
            Записаться на демо
          </Button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-[#00D1FF] rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-3 h-3 bg-[#A7F5FF] rounded-full"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  );
}
