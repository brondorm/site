import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MousePointerClick } from "lucide-react";

const panelFeatures = [
  {
    title: "Умная система тикетов",
    description:
      "Все заявки приходят в удобном формате. Видно всё: суть вопроса, контакты и статус. Отвечайте клиенту, закрывайте заявки или смотрите детали, не выходя из мессенджера."
  },
  {
    title: "Полная прозрачность диалогов",
    description:
      "Хотите проверить работу AI? В любой момент откройте историю переписки с конкретным клиентом. Вы всегда видите контекст и можете вмешаться, если это необходимо."
  },
  {
    title: "База клиентов всегда с вами",
    description:
      "Список всех, кто писал боту, сортируется по активности. Нужно перенести данные в CRM? Просто нажмите «Экспорт», и бот подготовит файл со всеми контактами."
  },
  {
    title: "Аналитика и контроль",
    description:
      "Следите за статистикой обращений, управляйте списком менеджеров и анализируйте, какие вопросы задают клиенты чаще всего, чтобы дообучать базу знаний."
  }
];

const cardFaceBase =
  "absolute inset-0 rounded-2xl border-[3px] border-white outline outline-1 outline-white backdrop-blur-sm";

export function ManagerPanel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [flipped, setFlipped] = useState<boolean[]>(
    () => panelFeatures.map(() => false)
  );
  const [showHint, setShowHint] = useState(true);
  const [hintArmed, setHintArmed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHintArmed(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hintArmed) {
      return;
    }

    const handleScroll = () => {
      setShowHint(false);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hintArmed]);

  const toggleCard = (index: number) => {
    setFlipped((previous) =>
      previous.map((value, currentIndex) =>
        currentIndex === index ? !value : value
      )
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-[#0C0C0C] via-[#0F1726] to-[#101725] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-12 left-12 w-48 h-48 bg-[#00D1FF]/10 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/3 w-40 h-40 bg-[#00D1FF]/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 right-10 w-72 h-72 bg-[#A7F5FF]/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-15">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,209,255,0.18) 1px, transparent 0)",
            backgroundSize: "36px 36px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-full mb-6">
            <span className="text-[#A7F5FF] text-xs md:text-sm uppercase tracking-[0.2em]">
              Панель управления для менеджера
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Держите руку на пульсе: Кабинет Менеджера прямо в Telegram
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Больше никаких потерянных диалогов. Мы сделали интерфейс, который
            позволяет контролировать работу бота и перехватывать управление в
            один клик.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8">
            {panelFeatures.map((feature, index) => (
              <motion.button
                key={feature.title}
                type="button"
                onClick={() => toggleCard(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
                aria-pressed={flipped[index]}
              >
                <div
                  className="relative w-full"
                  style={{ minHeight: "320px", perspective: "1400px" }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped[index]
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)"
                    }}
                  >
                    <div
                      className={`${cardFaceBase} bg-[#151C2B]/80 p-8`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#A7F5FF]/70">
                          <span>Модуль {String(index + 1).padStart(2, "0")}</span>
                          <span className="text-[#00D1FF]/80">Telegram</span>
                        </div>
                        <h3 className="mt-4 text-2xl text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-4 text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="mt-auto pt-6">
                          <div className="h-px w-full bg-gradient-to-r from-[#00D1FF]/60 via-[#00D1FF]/10 to-transparent" />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${cardFaceBase} bg-[#0B1420]/90 p-6`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#A7F5FF]/70 mb-4">
                          Скрин интерфейса
                        </span>
                        <div className="w-full rounded-2xl border border-dashed border-[#00D1FF]/30 bg-[#0C1A2C]/60 px-6 py-12 text-sm text-gray-300">
                          Скрин интерфейса появится здесь
                        </div>
                        <span className="text-xs text-gray-500 mt-4">
                          Добавим изображение позже
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {showHint && index === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-[#00D1FF]/30 bg-[#0B1624]/90 px-4 py-2 text-xs text-[#A7F5FF] shadow-[0_0_25px_rgba(0,209,255,0.25)] md:left-auto md:right-6 md:translate-x-0 md:text-sm"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D1FF]/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D1FF]" />
                    </span>
                    <MousePointerClick className="h-4 w-4 text-[#A7F5FF]" />
                    <span>Нажми, чтобы увидеть</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
