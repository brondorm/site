import { useRef, useState } from "react";
import { motion } from "motion/react";
import { MousePointerClick, X } from "lucide-react";

import orderNewImage from "../assets/images/Order_ new.png";
import historyImage from "../assets/images/history.png";
import cl1Image from "../assets/images/cl1.png";

const panelFeatures = [
  {
    title: "Умная система тикетов",
    description:
      "Все заявки приходят в удобном формате. Видно всё: суть вопроса, контакты и статус. Отвечайте клиенту, закрывайте заявки или смотрите детали, не выходя из мессенджера.",
    image: orderNewImage,
    imageAlt: "Скрин интерфейса: новые заявки"
  },
  {
    title: "Полная прозрачность диалогов",
    description:
      "Хотите проверить работу AI? В любой момент откройте историю переписки с конкретным клиентом. Вы всегда видите контекст и можете вмешаться, если это необходимо.",
    image: historyImage,
    imageAlt: "Скрин интерфейса: история диалогов"
  },
  {
    title: "База клиентов всегда с вами",
    description:
      "Список всех, кто писал боту, сортируется по активности. Нужно перенести данные в CRM? Просто нажмите «Экспорт», и бот подготовит файл со всеми контактами.",
    image: cl1Image,
    imageAlt: "Скрин интерфейса: база клиентов"
  },
  {
    title: "Аналитика и контроль",
    description:
      "Следите за статистикой обращений, управляйте списком менеджеров и анализируйте, какие вопросы задают клиенты чаще всего, чтобы дообучать базу знаний."
  }
];

const safetySteps = [
  {
    title: "Проверка знаний",
    description:
      "Бот ищет ответ в вашей базе. Если точного совпадения нет, он отправляет запрос к менеджеру. Никаких галлюцинаций."
  },
  {
    title: "Создание «Тикета помощи»",
    description:
      "Бот честно пишет клиенту: «Уточняю этот момент у специалиста, одну минуту». В ту же секунду менеджер получает тикет с пометкой «Сложный вопрос»."
  },
  {
    title: "Бесшовный перехват",
    description:
      "Менеджер пишет ответ в свою панель управления. Бот пересылает этот ответ клиенту. Для клиента это выглядит как непрерывный диалог."
  },
  {
    title: "Превращаем тикеты в опыт (Smart Learning)",
    description:
      "Все вопросы, на которые отвечали менеджеры, сохраняются в истории обработанных тикетов."
  }
];

const cardFaceBase =
  "relative rounded-2xl border-[3px] border-white outline outline-1 outline-white backdrop-blur-sm";
const screenshotImageClass =
  "h-full w-full rounded-[28px] object-contain [clip-path:inset(0_round_28px)]";

type CardOffset = {
  x: number;
  y: number;
};

export function ManagerPanel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeOffset, setActiveOffset] = useState<CardOffset | null>(null);

  const openCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card || typeof window === "undefined") {
      return;
    }

    const rect = card.getBoundingClientRect();
    const offsetX = rect.left + rect.width / 2 - window.innerWidth / 2;
    const offsetY = rect.top + rect.height / 2 - window.innerHeight / 2;

    setActiveIndex(index);
    setActiveOffset({ x: offsetX, y: offsetY });
  };

  const closeCard = () => {
    setActiveIndex(null);
    setActiveOffset(null);
  };

  const renderGridCard = (
    feature: (typeof panelFeatures)[number],
    index: number
  ) => (
    <div className="w-full">
      <div className={`${cardFaceBase} bg-[#151C2B]/80 p-6 sm:p-8`}>
        <div className="flex min-h-[320px] flex-col">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#A7F5FF]/70">
            <span>Модуль {String(index + 1).padStart(2, "0")}</span>
            <span className="text-[#00D1FF]/80">Telegram</span>
          </div>
          <h3 className="mt-4 text-2xl text-white">{feature.title}</h3>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {feature.description}
          </p>
          <div className="mt-auto pt-6">
            <div className="h-px w-full bg-gradient-to-r from-[#00D1FF]/60 via-[#00D1FF]/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverlayImage = (
    feature: (typeof panelFeatures)[number],
    index: number
  ) => (
    <div
      className="relative h-full w-full"
      style={{ perspective: "2000px" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: 180 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 rounded-[28px] border border-[#00D1FF]/30 bg-[#0B1420]/95 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#A7F5FF]/70">
              Модуль {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 text-sm text-gray-300">
              Открываем экран
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {feature.image ? (
            <div className="h-full w-full overflow-hidden rounded-[28px] border border-[#00D1FF]/30 bg-[#050B16] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <img
                src={feature.image}
                alt={feature.imageAlt ?? "Скрин интерфейса"}
                className={screenshotImageClass}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[28px] border border-dashed border-[#00D1FF]/30 bg-[#0C1A2C]/70 text-sm text-gray-300">
              Скрин интерфейса появится здесь
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  const activeFeature =
    activeIndex !== null ? panelFeatures[activeIndex] : null;

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
            {panelFeatures.map((feature, index) => {
              const hasPreview = Boolean(feature.image);
              return (
              <motion.button
                key={feature.title}
                type="button"
                onClick={() => {
                  if (!hasPreview) {
                    return;
                  }
                  activeIndex === index ? closeCard() : openCard(index);
                }}
                disabled={!hasPreview}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={hasPreview ? { y: -6 } : undefined}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`group relative block w-full text-left transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] ${
                  activeIndex === index ? "opacity-0" : "opacity-100"
                } ${hasPreview ? "" : "cursor-default"}`}
                aria-pressed={hasPreview ? activeIndex === index : undefined}
                aria-disabled={!hasPreview}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
              >
                {renderGridCard(feature, index)}
              </motion.button>
              );
            })}
          </div>
          {activeFeature && activeOffset && (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center bg-[#05070D]/70 px-4 py-10 backdrop-blur-sm"
              onClick={closeCard}
            >
              <motion.div
                initial={{
                  x: activeOffset.x,
                  y: activeOffset.y,
                  scale: 0.92,
                  opacity: 0.6
                }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                style={{
                  width: "min(96vw, 1400px)",
                  height: "min(88vh, 900px)"
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeCard();
                  }}
                  aria-label="Закрыть экран"
                  className="group absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#00D1FF]/70 bg-[#071221]/75 text-[#9EE7FF] shadow-[0_0_18px_rgba(0,209,255,0.65),0_0_36px_rgba(0,209,255,0.45)] transition duration-300 hover:scale-105 hover:shadow-[0_0_26px_rgba(0,209,255,0.9),0_0_55px_rgba(0,209,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070D]"
                >
                  <X className="h-5 w-5 drop-shadow-[0_0_8px_rgba(0,209,255,0.9)]" />
                </button>
                {renderOverlayImage(activeFeature, activeIndex ?? 0)}
              </motion.div>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <div
              className="pointer-events-none flex items-center gap-2 rounded-full border border-[#00D1FF]/30 bg-[#0B1624]/90 px-4 py-2 text-xs text-[#A7F5FF] shadow-[0_0_25px_rgba(0,209,255,0.25)] md:text-sm"
              style={{ transform: "translateY(10px)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D1FF]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D1FF]" />
              </span>
              <MousePointerClick className="h-4 w-4 text-[#A7F5FF]" />
              <span>Нажмите на модуль, чтобы увидеть подробности</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-4xl text-white mb-4">
              «А что, если ИИ-агент не знает ответа? Он начнет фантазировать?»
            </h3>
            <p className="text-lg md:text-xl text-[#A7F5FF] font-medium mb-6">
              Исключено. Мы внедрили механизм защиты от галлюцинаций.
            </p>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Многие боятся, что нейросеть начнет придумывать несуществующие
              услуги или цены, чтобы угодить клиенту. В ClickToFuture это
              технически невозможно.
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Мы настроили систему так, что если уверенность ИИ в ответе ниже
              80%, он не рискует репутацией компании, а мгновенно переводит
              вопрос на человека в виде нового Тикета.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D1FF]/30 bg-[#0B1624]/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#A7F5FF]">
              Как это работает:
            </span>
          </motion.div>

          <div className="relative mt-12">
            <div className="absolute bottom-0 left-6 top-0 border-l border-dashed border-[#00D1FF]/40 md:hidden" />
            <div className="absolute top-0 bottom-0 left-1/2 hidden w-px border-l border-dashed border-[#00D1FF]/40 md:block" />

            <div className="relative flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-12">
              {safetySteps.map((step, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.12 }}
                    viewport={{ once: true }}
                    className={`relative pl-10 md:pl-0 md:max-w-md ${
                      isLeft
                        ? "md:col-start-1 md:justify-self-end"
                        : "md:col-start-2 md:justify-self-start md:mt-10"
                    }`}
                  >
                    <span
                      className={`absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D1FF]/60 bg-[#00D1FF] shadow-[0_0_18px_rgba(0,209,255,0.6)] md:top-1/2 md:left-auto md:translate-x-0 ${
                        isLeft ? "md:-right-8" : "md:-left-8"
                      }`}
                      style={{ width: "14px", height: "14px" }}
                    />
                    <div className="w-full rounded-2xl border border-[#00D1FF]/20 bg-[#111827]/80 p-6 md:p-7 backdrop-blur-sm">
                      <div className="text-xs uppercase tracking-[0.3em] text-[#A7F5FF]/70">
                        Шаг {String(index + 1).padStart(2, "0")}
                      </div>
                      <h4 className="mt-3 text-xl text-white">
                        {step.title}
                      </h4>
                      <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <p className="mt-8 text-center text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            У вас есть возможность проанализировать наиболее популярные вопросы
            и обновить базу данных, чтобы система стала еще эффективнее.
          </p>
        </div>
      </div>
    </section>
  );
}
