import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";

// Плоское меню верхнего уровня (без выпадающих списков).
// Пункты «Внедрение под ключ» и «Кейсы» появятся здесь, когда будут готовы их страницы.
const navLinks = [
  { label: "Главная", to: "/" },
  { label: "ИИ менеджер", to: "/ai-manager" },
];

export function Header() {
  const openLeadModal = () => window.dispatchEvent(new Event("openDemoModal"));
  // Пока нет отдельной страницы «Внедрение под ключ» — ведём к блоку «Два способа начать».
  const scrollToChoose = () =>
    document.getElementById("choose")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-40 border-b border-white/10 bg-[#0C0C0C]/70 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.4)]">
            <MousePointerClick className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg text-white">ClickToFuture</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-300 hover:text-[#00D1FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={scrollToChoose}
            className="text-gray-300 hover:text-[#00D1FF] transition-colors"
          >
            Внедрение под ключ
          </button>
        </nav>

        <Button
          onClick={openLeadModal}
          className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
        >
          Получить разбор
        </Button>
      </div>
    </motion.header>
  );
}
