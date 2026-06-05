import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useInView,
  animate,
} from "motion/react";
import { Check, Search, PenTool, ClipboardList, Code2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// Импортируем картинки через Vite — у них будут хэш-имена, кэш браузера
// сбрасывается автоматически при любом изменении файла.
import step2Img from "../../assets/steps/step2.webp";
import step3Img from "../../assets/steps/step3.webp";
import step4Img from "../../assets/steps/step4.webp";

// Шаги внедрения под ключ. Картинки — прозрачные webp (фон вырезан,
// остаётся только неоновая иллюстрация). Иконка — для узла таймлайна.
const steps: {
  n: number;
  title: string;
  text: string;
  img: string;
  Icon: LucideIcon;
}[] = [
  {
    n: 1,
    title: "Разбираемся в вашем бизнесе",
    text: "Созваниваемся и изучаем, как устроена работа отделов. Вместе находим повторяющиеся задачи, которые отнимают у команды больше всего времени и денег. Вы показываете процесс как он есть, мы фиксируем узкие места.",
    // Картинка из public/ — фон уже вырезан, файл не трогаем (см. CLAUDE.md про кэш public).
    img: "./Разбираемся в вашем бизнесе.png",
    Icon: Search,
  },
  {
    n: 2,
    title: "Проектируем решение под вашу задачу",
    text: "Определяем, что автоматизировать в первую очередь, как система свяжется с вашими сервисами (1С, CRM, мессенджеры) и сколько это сэкономит. Окупаемость считаем заранее, чтобы вы видели выгоду в цифрах ещё до старта работ.",
    img: step2Img,
    Icon: PenTool,
  },
  {
    n: 3,
    title: "Показываем план, сроки и стоимость",
    text: "Готовим понятный документ: какое решение предлагаем, что оно умеет, где его границы и насколько ускорит ваши процессы. Фиксированную стоимость и сроки вы видите до того, как примете решение. Если автоматизация не окупится, скажем об этом честно и предложим более простые шаги.",
    img: step3Img,
    Icon: ClipboardList,
  },
  {
    n: 4,
    title: "Разрабатываем и держим вас в курсе",
    text: "Собираем систему и каждую неделю показываем, на каком этапе работа. Тестируем на ваших реальных сценариях и проверяем безопасность, чтобы данные оставались под защитой. Никаких сюрпризов в конце проекта.",
    img: step4Img,
    Icon: Code2,
  },
  {
    n: 5,
    title: "Запускаем и обучаем команду",
    text: "Передаём готовое решение и показываем сотрудникам, как пользоваться им в ежедневной работе. Собираем обратную связь и дорабатываем детали, пока система не начнёт приносить пользу с первого дня.",
    // Картинка из public/ — фон уже вырезан, файл не трогаем (см. CLAUDE.md про кэш public).
    img: "./Обучение.png",
    Icon: Rocket,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;
const SEGMENT_SEC = 2; // проезд луча от узла к узлу
const NODE_PAUSE_SEC = 3; // задержка на каждом достигнутом узле перед движением дальше

// ─── Самоиграющий зацикленный таймлайн (по мотивам wetracked.io/how-it-works) ───
// Плавный луч едет слева направо, узлы загораются галочкой по мере прохождения.
// Фон узлов непрозрачный, поэтому линия визуально упирается в край иконки, а не прошивает её.
function AnimatedTimeline() {
  const n = steps.length;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  // progress: 0..(n-1) — положение «головы» линии в единицах узлов.
  const progress = useMotionValue(0);
  const fill = useTransform(progress, [0, n - 1], ["0%", "100%"]);

  // reached — индекс последнего достигнутого узла (для галочек/подсветки/подписи).
  const [reached, setReached] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const r = Math.min(n - 1, Math.floor(v + 0.001));
    setReached((prev) => (prev === r ? prev : r));
  });

  // Пошаговая анимация: луч едет SEGMENT_SEC до узла, затем стоит NODE_PAUSE_SEC,
  // и так до последнего узла; потом мгновенный сброс в 0 и повтор.
  // Это набор keyframes по позициям узлов с задержкой-«дублем» значения на каждом узле:
  // [0, 1,1, 2,2, …] с временами, где переходы длятся SEGMENT_SEC, а «дубли» — NODE_PAUSE_SEC.
  useEffect(() => {
    if (!inView) {
      progress.set(0);
      setReached(0);
      return;
    }
    const total = (n - 1) * (SEGMENT_SEC + NODE_PAUSE_SEC);
    const keyframes: number[] = [0];
    const times: number[] = [0];
    let elapsed = 0;
    for (let i = 1; i < n; i++) {
      elapsed += SEGMENT_SEC; // проезд до узла i
      keyframes.push(i);
      times.push(elapsed / total);
      elapsed += NODE_PAUSE_SEC; // задержка на узле i (то же значение → луч стоит)
      keyframes.push(i);
      times.push(elapsed / total);
    }
    const controls = animate(progress, keyframes, {
      duration: total,
      times,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop", // на повторе мгновенно прыгает в 0 — линия сбрасывается
    });
    return () => controls.stop();
  }, [inView, n, progress]);

  return (
    <div ref={ref} className="mx-auto max-w-5xl">
      <div className="rounded-3xl border border-[#00D1FF]/20 bg-[#1B1F2A]/40 px-4 py-12 backdrop-blur-sm sm:px-12 md:px-16">
        {/* Дорожка с узлами */}
        <div className="relative px-3 sm:px-8">
          <div className="relative h-12 sm:h-16">
            {/* фоновая линия (под узлами) */}
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10">
              {/* заливаемая линия */}
              <motion.div
                style={{ width: fill }}
                className="h-full rounded-full bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] shadow-[0_0_10px_rgba(0,209,255,0.6)]"
              />
            </div>

            {/* узлы — равномерно по позициям 0%..100%, непрозрачный фон перекрывает линию */}
            {steps.map((s, i) => {
              const done = i <= reached;
              const isCurrent = i === reached;
              const Icon = s.Icon;
              return (
                <div
                  key={s.n}
                  style={{ left: `${(i / (n - 1)) * 100}%` }}
                  className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{ scale: isCurrent ? 1.12 : 1 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#141824] transition-colors duration-300 sm:h-14 sm:w-14 ${
                      done
                        ? "border-[#00D1FF] shadow-[0_0_18px_rgba(0,209,255,0.5)]"
                        : "border-white/15"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors duration-300 sm:h-6 sm:w-6 ${
                        done ? "text-[#00D1FF]" : "text-gray-600"
                      }`}
                      strokeWidth={1.8}
                    />
                    {/* галочка появляется, когда линия дошла до узла */}
                    <AnimatePresence>
                      {done && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeOut }}
                          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] shadow-[0_0_10px_rgba(0,209,255,0.7)] sm:h-5 sm:w-5"
                        >
                          <Check className="h-2.5 w-2.5 text-black sm:h-3 sm:w-3" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Меняющаяся подпись текущего шага */}
        <div className="mt-12 flex h-16 items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={reached}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="text-lg text-white md:text-2xl"
            >
              <span className="bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] bg-clip-text text-transparent">
                Шаг {reached + 1}.
              </span>{" "}
              {steps[reached].title}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Детальные секции по шагам (чередуем картинку слева/справа) ───
function StepDetails() {
  return (
    <div className="mx-auto mt-28 max-w-6xl space-y-24 md:space-y-32">
      {steps.map((s, i) => {
        const reversed = i % 2 === 1;
        return (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            {/* Картинка (прозрачный фон — просто свечение под ней для глубины).
                На мобиле — под текстом (order-2), на десктопе порядок колонок прежний. */}
            <div className={`order-2 ${reversed ? "md:order-2" : "md:order-1"}`}>
              <div className="relative mx-auto max-w-[460px]">
                <div className="absolute inset-[12%] -z-10 rounded-full bg-[#00D1FF]/15 blur-[70px]" />
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full drop-shadow-[0_0_25px_rgba(0,209,255,0.25)]"
                />
              </div>
            </div>

            {/* Текст — на мобиле над картинкой (order-1), на десктопе колонки прежние. */}
            <div className={`order-1 ${reversed ? "md:order-1" : "md:order-2"}`}>
              <span className="text-sm uppercase tracking-[0.2em] text-[#00D1FF]/70">
                Step {String(s.n).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-3xl text-white lg:text-4xl">{s.title}</h3>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">{s.text}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function HowWeWorkSteps() {
  return (
    <section className="bg-gradient-to-b from-[#0C0C0C] via-[#0B0F14] to-[#0C0C0C] px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-14 text-center"
      >
        <div className="mb-5 inline-block rounded-full border border-[#00D1FF]/30 bg-[#00D1FF]/10 px-4 py-2">
          <span className="text-[#00D1FF]">Полный цикл — 5 шагов</span>
        </div>
        <h2 className="text-4xl text-white md:text-5xl">От первого созвона до запуска</h2>
      </motion.div>

      <AnimatedTimeline />
      <StepDetails />
    </section>
  );
}
