import { motion } from "motion/react";
import { MousePointerClick, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0C0C0C]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              whileHover={{ scale: 1.1 }}
            >
              <MousePointerClick className="w-6 h-6 text-black" />
            </motion.div>
            <span className="text-2xl text-white">ClickToFuture</span>
          </Link>

          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)] gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 mx-auto text-[#00D1FF]" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] bg-clip-text text-transparent uppercase font-bold">
            Спасибо за Вашу заявку!
          </h1>

          <p className="text-xl md:text-2xl text-gray-300">
            Свяжемся с Вами в ближайшее время
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-8 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-400 mb-6">
            <Link to="/privacy" className="hover:text-[#00D1FF] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-[#00D1FF] transition-colors">
              Пользовательское соглашение
            </Link>
          </div>

          <div className="pt-6 border-t border-white/5 text-center text-gray-500">
            <p>&copy; 2025 ClickToFuture. Будущее клиентской поддержки.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
