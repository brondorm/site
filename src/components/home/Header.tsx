import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MousePointerClick, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetTitle,
} from "../ui/sheet";

// Плоское меню верхнего уровня (без выпадающих списков).
const navLinks = [
  { label: "Главная", to: "/" },
  { label: "ИИ менеджер", to: "/ai-manager" },
  { label: "Внедрение под ключ", to: "/custom" },
  { label: "Кейсы", to: "/cases" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const openLeadModal = () => window.dispatchEvent(new Event("openDemoModal"));

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-40 border-b border-white/10 bg-[#0C0C0C]/70 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.4)]">
            <MousePointerClick className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg text-white">ClickToFuture</span>
        </Link>

        {/* Десктопная навигация */}
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
        </nav>

        {/* Десктопная CTA-кнопка */}
        <Button
          onClick={openLeadModal}
          className="hidden md:inline-flex bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
        >
          Получить разбор
        </Button>

        {/* Мобильное меню (бургер) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Открыть меню"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-[#00D1FF]/30 text-[#00D1FF] transition-colors hover:bg-[#00D1FF]/10"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] max-w-xs border-l border-[#00D1FF]/20 bg-[#0C0C0C] p-6 text-white"
          >
            <SheetTitle className="flex items-center gap-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] shadow-[0_0_15px_rgba(0,209,255,0.4)]">
                <MousePointerClick className="h-5 w-5 text-black" />
              </span>
              ClickToFuture
            </SheetTitle>

            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.to}>
                  <Link
                    to={link.to}
                    className="rounded-lg px-3 py-3 text-lg text-gray-300 transition-colors hover:bg-[#00D1FF]/10 hover:text-[#00D1FF]"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <Button
              onClick={() => {
                setOpen(false);
                openLeadModal();
              }}
              className="mt-6 w-full bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
            >
              Получить разбор
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
