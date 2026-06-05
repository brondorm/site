import type { Variants } from "motion/react";

// Общие пресеты анимаций для появления секций при скролле.
// Паттерн: whileInView + viewport once (самый распространённый для лендингов).

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

// Контейнер для поочерёдного появления дочерних элементов (stagger).
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// Единые настройки viewport: анимируем один раз, когда видно ~30% блока.
export const viewportOnce = { once: true, amount: 0.3 } as const;
