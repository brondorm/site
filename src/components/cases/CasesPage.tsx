import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  X,
  History,
  TrendingDown,
  Sparkles,
  TrendingUp,
  Camera,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Header } from "../home/Header";
import { FinalCTA } from "../FinalCTA";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";
import { cases, type CaseStudy, type CaseImage } from "./casesData";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Что мы внедряем — слова сменяются в герое (по мотивам modal.com/customers).
const rotatingWords = [
  "ИИ-агентов",
  "ИИ-менеджеров",
  "ИИ-продавцов",
  "ИИ базу знаний",
  "ИИ-ассистентов",
];

// ─── Рендер текста с markdown-разметкой **жирного** и [ссылок](/url) ───
// Жирное → белый акцент, ссылки → внутренний роутерный Link неонового цвета.
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-medium text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <Link
              key={i}
              to={link[2]}
              className="text-[#00D1FF] underline-offset-2 hover:underline"
            >
              {link[1]}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ─── Сменяющееся слово (вертикальный «ролик») ───
// Слово уезжает вниз и скрывается за невидимой границей (overflow-hidden),
// одновременно сверху синхронно опускается следующее. Пауза на каждом слове ~2 с.
function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % rotatingWords.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative block h-[1.15em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ y: "-110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="absolute inset-x-0 top-0 text-[#00D1FF]"
          style={{ textShadow: "0 0 35px rgba(0,209,255,0.55)" }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Герой страницы «Кейсы» ───
function CasesHero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 pb-20 pt-28">
      {/* Фоновая сетка с радиальной маской */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#00D1FF 1px, transparent 1px), linear-gradient(90deg, #00D1FF 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />
      {/* Glow-эффекты */}
      <motion.div
        className="absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-[#00D1FF]/10 blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#A7F5FF]/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-6 inline-block rounded-full border border-[#00D1FF]/30 bg-[#00D1FF]/10 px-4 py-2"
        >
          <span className="text-[#00D1FF]">Кейсы</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          className="text-5xl text-white md:text-7xl"
          style={{ lineHeight: 1.1 }}
        >
          Внедряем
          <RotatingWord />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
          className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl"
        >
          Реальные внедрения в бизнес-процессы. Считаем сэкономленное время и
          заработанные деньги.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-4 max-w-xl text-base text-gray-500"
        >
          Кликните на кейс, чтобы посмотреть, как было, что мы сделали и какой
          получили результат.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Карточка кейса (кликабельна — открывает детальную карточку) ───
function CaseCard({ data, onOpen }: { data: CaseStudy; onOpen: () => void }) {
  const { Icon } = data;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="group flex h-full flex-col rounded-3xl border border-[#00D1FF]/20 bg-[#1B1F2A]/50 p-8 text-left backdrop-blur-sm transition-colors duration-300 hover:border-[#00D1FF]/50 hover:shadow-[0_0_40px_rgba(0,209,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] shadow-[0_0_20px_rgba(0,209,255,0.4)]">
          <Icon className="h-7 w-7 text-black" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-6 w-6 text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#00D1FF]" />
      </div>

      <span className="text-sm uppercase tracking-[0.15em] text-[#00D1FF]/70">
        {data.industry}
      </span>
      <h3 className="mt-3 text-2xl text-white">{data.title}</h3>
      <p className="mt-4 flex-1 leading-relaxed text-gray-300">
        <RichText text={data.teaser} />
      </p>

      <div className="mt-8 flex items-baseline gap-3 border-t border-white/10 pt-6">
        <span
          className="bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] bg-clip-text text-4xl text-transparent md:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          {data.metric.value}
        </span>
        <span className="text-sm text-gray-400">{data.metric.label}</span>
      </div>
    </motion.button>
  );
}

// ─── Детальная карточка кейса (модалка) ───
const sections = [
  { key: "before", label: "Как было", Icon: History },
  { key: "loss", label: "Сколько теряли", Icon: TrendingDown },
  { key: "after", label: "Как стало", Icon: Sparkles },
  { key: "result", label: "Результат", Icon: TrendingUp },
] as const;

// ─── Лайтбокс: фото на весь экран, чтобы разглядеть мелкие скрины ───
// Открывается кликом по фото в галерее. Листается стрелками/клавишами,
// закрывается по клику вне фото, крестику или Esc. Слушатель Esc — в фазе
// capture, чтобы перехватить его раньше, чем CaseModal закроет саму карточку.
function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: CaseImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const go = (dir: number) =>
    onIndexChange((index + dir + images.length) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  const img = images[index];
  const navBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#00D1FF]/40 bg-[#0B1624]/85 text-[#00D1FF] shadow-[0_0_18px_rgba(0,209,255,0.25)] transition-colors hover:bg-[#00D1FF]/15 hover:text-white";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 p-4 sm:p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center justify-center gap-3 overflow-hidden sm:gap-5">
        {images.length > 1 && (
          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className={navBtn}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <motion.img
          key={img.src}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: easeOut }}
          src={img.src}
          alt={img.alt}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full select-none rounded-xl object-contain shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        />

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className={navBtn}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <p className="mt-4 shrink-0 text-center text-sm text-gray-300">
        {img.alt}
        {images.length > 1 && (
          <span className="ml-2 text-gray-500">
            {index + 1} / {images.length}
          </span>
        )}
      </p>
    </motion.div>
  );
}

// ─── Просмотрщик скриншотов кейса: одно фото крупно + листание (свайп/стрелки/точки) ───
function CaseGallery({ images }: { images: CaseImage[] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const navBtn =
    "border-[#00D1FF]/40 bg-[#0B1624]/85 text-[#00D1FF] shadow-[0_0_18px_rgba(0,209,255,0.25)] hover:bg-[#00D1FF]/15 hover:text-white disabled:opacity-30";

  return (
    <div>
      <h3 className="mb-4 text-lg text-white">Как это выглядит</h3>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={img.src}>
              <div className="flex h-[58vh] max-h-[520px] items-center justify-center rounded-2xl border border-[#00D1FF]/20 bg-[#0C0C0C]/60 p-3">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label="Открыть фото на весь экран"
                  className="group relative flex h-full w-full cursor-zoom-in items-center justify-center focus:outline-none"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    draggable={false}
                    className="max-h-full w-auto max-w-full select-none rounded-xl object-contain"
                  />
                  <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={`left-3 ${navBtn}`} />
        <CarouselNext className={`right-3 ${navBtn}`} />
      </Carousel>

      {/* Подпись текущего скрина + подсказка про увеличение */}
      <p className="mt-3 text-center text-sm text-gray-400">
        {images[current]?.alt}
      </p>
      <button
        type="button"
        onClick={() => setLightbox(current)}
        className="mx-auto mt-1 flex items-center gap-1.5 text-xs text-[#00D1FF]/80 transition-colors hover:text-[#00D1FF]"
      >
        <ZoomIn className="h-3.5 w-3.5" />
        Нажмите на фото, чтобы увеличить
      </button>

      {/* Точки-индикаторы / переход к слайду */}
      <div className="mt-4 flex justify-center gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Слайд ${i + 1}`}
            aria-current={i === current}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "w-6 bg-[#00D1FF]"
                : "w-2 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={images}
            index={lightbox}
            onIndexChange={setLightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseModal({ data, onClose }: { data: CaseStudy; onClose: () => void }) {
  // Блокируем скролл фона и закрываем по Esc, пока открыта карточка.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const { Icon } = data;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.3, ease: easeOut }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-auto my-4 w-full max-w-3xl rounded-3xl border border-[#00D1FF]/30 bg-[#101726] shadow-[0_0_60px_rgba(0,209,255,0.25)]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Шапка карточки */}
          <div className="border-b border-white/10 p-8 pb-8 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] shadow-[0_0_20px_rgba(0,209,255,0.4)]">
              <Icon className="h-7 w-7 text-black" strokeWidth={1.8} />
            </div>
            <span className="mt-5 block text-sm uppercase tracking-[0.15em] text-[#00D1FF]/70">
              {data.industry}
            </span>
            <h2 className="mt-2 text-3xl text-white md:text-4xl">{data.title}</h2>
            <div className="mt-5 inline-flex items-baseline gap-3 rounded-2xl border border-[#00D1FF]/20 bg-[#00D1FF]/5 px-5 py-3">
              <span
                className="bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] bg-clip-text text-3xl text-transparent md:text-4xl"
                style={{ lineHeight: 1.1 }}
              >
                {data.metric.value}
              </span>
              <span className="text-sm text-gray-300">{data.metric.label}</span>
            </div>
          </div>

          {/* Секции: как было / сколько теряли / как стало / результат */}
          <div className="space-y-8 p-8 sm:p-10">
            {sections.map(({ key, label, Icon: SectionIcon }) => (
              <div key={key} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00D1FF]/25 bg-[#00D1FF]/10">
                  <SectionIcon className="h-5 w-5 text-[#00D1FF]" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg text-white">{label}</h3>
                  <p className="leading-relaxed text-gray-300">
                    <RichText text={data[key]} />
                  </p>
                </div>
              </div>
            ))}

            {/* Скриншоты кейса — просмотрщик с листанием, иначе заглушка под фото */}
            {data.images && data.images.length > 0 ? (
              <CaseGallery images={data.images} />
            ) : (
              <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#00D1FF]/25 bg-[#0C0C0C]/60 text-gray-500">
                <Camera className="h-8 w-8 text-[#00D1FF]/40" strokeWidth={1.5} />
                <span className="text-sm">Фото скоро появится</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ─── Сетка кейсов ───
function CasesGrid({ onOpen }: { onOpen: (c: CaseStudy) => void }) {
  return (
    <section className="bg-gradient-to-b from-[#0C0C0C] via-[#0B0F14] to-[#0C0C0C] px-6 pb-28 pt-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2"
      >
        {cases.map((c) => (
          <CaseCard key={c.id} data={c} onOpen={() => onOpen(c)} />
        ))}
      </motion.div>
    </section>
  );
}

// Страница «Кейсы» (/cases). Витрина — полное меню.
export function CasesPage() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0C0C0C] text-white">
      <Header />
      <CasesHero />
      <CasesGrid onOpen={setActive} />
      <FinalCTA
        heading="Хотите такой же результат в своём бизнесе?"
        description="Разберём ваши процессы и посчитаем, сколько времени и денег можно сэкономить с ИИ — ещё до старта работ."
        buttonLabel="Получить разбор процессов"
      />

      <AnimatePresence>
        {active && <CaseModal data={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
