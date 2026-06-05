# ClickToFuture — сайт-витрина + продуктовые лендинги

## Что за проект

Сайт компании ClickToFuture (внедрение ИИ в бизнес). Состоит из:
- **Главной страницы-витрины** — знакомит с компанией, ведёт на продукты и к форме захвата лида
- **Лендинга продукта «ИИ менеджер»** — конверсионная страница, минимум навигации

**Деплой:** статика в `docs/`, раздаётся через `serve -s docs -l 4444` внутри Docker-контейнера `ctf-site-prod-test`. GitHub Pages (clicktofuture.ru) тоже берёт из `docs/`.

---

## Стек

- React 18 + Vite 6 + TypeScript
- Tailwind CSS (v4 через `@tailwindcss/vite`)
- shadcn/ui — готовые компоненты в `src/components/ui/`
- `motion/react` (бывший Framer Motion) — все анимации
- `react-router-dom` — SPA-роутинг
- `lucide-react` — иконки

---

## Роутинг (`src/App.tsx`)

| Путь | Компонент | Назначение |
|------|-----------|------------|
| `/` | `Home` | Витрина компании (полное меню) |
| `/ai-manager` | `AiManagerPage` | Конверсионный лендинг «ИИ менеджер» (без меню) |
| `/custom` | `TurnkeyPage` | «Внедрение под ключ» — как мы работаем, 5 шагов (полное меню) |
| `/privacy` | `PrivacyPolicy` | Политика конфиденциальности |
| `/terms` | `TermsOfService` | Пользовательское соглашение |
| `/thanks` | `ThanksPage` | Страница после отправки формы |

---

## Структура компонентов

### Главная (`src/components/home/`)
- `Home.tsx` — сборка всех секций
- `Header.tsx` — фиксированная шапка с плоским меню (логотип + навигация + CTA-кнопка)
- `HomeHero.tsx` — первый экран: анимированная сетка + парящие роботы (`public/robot.png`) + параллакс при скролле
- `HowItWorksSteps.tsx` — «От рутины к автоматизации — за три шага»
- `ChoosePath.tsx` — «Два способа начать» (Готовые продукты / Внедрение под ключ), `id="choose"`
- `AboutUs.tsx` — раздел «Про нас»

### Лендинг продукта (`src/components/`)
- `HeroSection.tsx` — герой ИИ менеджера
- `ProblemSolution.tsx` — проблема → решение
- `HowItWorks.tsx` — 4 шага диалога с ботом
- `ManagerPanel.tsx` — демо панели менеджера
- `Benefits.tsx` — преимущества
- `WhyNow.tsx` — почему сейчас
- `FinalCTA.tsx` — финальный CTA + форма захвата лида + футер

### Внедрение под ключ (`src/components/turnkey/`)
- `TurnkeyPage.tsx` — сборка: `Header` + герой + `HowWeWorkSteps` + `FinalCTA`
- `HowWeWorkSteps.tsx` — по мотивам wetracked.io/how-it-works:
  - `AnimatedTimeline` — **самоиграющий зацикленный таймлайн**: луч едет пошагово — `SEGMENT_SEC` проезжает до узла, затем стоит `NODE_PAUSE_SEC` на нём, и так до конца, потом мгновенный сброс и повтор. Реализовано через keyframes по позициям узлов (`animate(progress, [0,1,1,2,2,…], {duration, times, ease:"linear", repeat:Infinity, repeatType:"loop"})`): «дубль» значения на каждом узле = пауза. Узлы (иконки lucide) загораются галочкой по мере прохождения. Узлы с непрозрачным фоном перекрывают линию, поэтому она упирается в край иконки, а не прошивает её. Темп: `SEGMENT_SEC` / `NODE_PAUSE_SEC` сверху файла. Запускается, когда блок виден (`useInView`).
  - `StepDetails` — 5 детальных секций с чередованием картинка/текст, появление по скроллу.
  - Картинки: **`src/assets/steps/step1.webp`…`step5.webp`**, импортируются в компонент (Vite даёт хэш-имена → авто-сброс кэша браузера при изменении; НЕ класть в `public`, иначе имя не меняется и виснет старая версия из кэша). **Прозрачный фон**, конвейер (PIL): вычесть «подложку» фона (`(px - bg)*gain`, gain зависит от яркости фона — у step1 фон серый) → цветовое ключевание остатка по чёрному в альфу. Так все 5 однородны, без серого ящика и без ореола. Сжаты ~14 МБ → ~0.6 МБ. Оригиналы — в `design-src/` (вне сборки).

### Общее
- `FinalCTA.tsx` принимает пропсы `heading`, `description`, `buttonLabel` — переиспользуется и на Главной
- Форма захвата лида живёт в `FinalCTA.tsx` и открывается через `window.dispatchEvent(new Event("openDemoModal"))` из любого места

---

## Дизайн-система

### Цвета
- Фон страницы: `#0C0C0C`
- Фон секций: `from-[#0C0C0C] via-[#1a1a2e] to-[#0C0C0C]`, `#0B0F14`, `#101726`
- Фон карточек: `#1B1F2A`
- Акцент (неон): `#00D1FF` → `#0099CC` (градиент кнопок и бейджей)
- Светлый акцент: `#A7F5FF`
- Текст градиент заголовков: `from-white via-[#A7F5FF] to-[#00D1FF]`
- Текст обычный: `text-gray-300`, вторичный: `text-gray-400`/`text-gray-500`

### Типографика
- Герои / крупные заголовки: `text-5xl md:text-7xl`, `lineHeight: 1.1`
- Заголовки секций: `text-4xl md:text-5xl`
- Подзаголовки: `text-xl md:text-2xl`
- Тело: `text-base` / `text-lg`, `text-gray-300`

### Компоненты
- **Кнопка primary:** `bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)]`
- **Кнопка outline:** `bg-transparent border border-[#00D1FF]/40 text-[#00D1FF] hover:bg-[#00D1FF]/10`
- **Карточки:** `bg-[#1B1F2A]/50 backdrop-blur-sm border border-[#00D1FF]/20 rounded-3xl p-8 hover:border-[#00D1FF]/40`
- **Нумерованный бейдж:** `w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full shadow-[0_0_20px_rgba(0,209,255,0.4)]`
- **Плашка-тег:** `px-4 py-2 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-full text-[#00D1FF]`
- **Секция:** `py-24 px-6`, контент `max-w-6xl mx-auto` (иногда `max-w-4xl`)

### Анимации (`src/lib/motion.ts`)
Переиспользуемые пресеты:
- `fadeUp` — появление снизу при скролле
- `staggerContainer` — поочерёдное появление дочерних элементов (0.15s stagger)
- `scaleIn` — появление с масштабированием
- `fadeIn` — просто fade
- `viewportOnce` — `{ once: true, amount: 0.3 }` — стандартные настройки viewport

Паттерн использования:
```tsx
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
  <motion.div variants={fadeUp}>...</motion.div>
</motion.div>
```

Параллакс в герое через `useScroll` + `useTransform` (только `y` и `opacity`).

Фоновые glow-эффекты: `w-32+ h-32+ bg-[#00D1FF]/10 rounded-full blur-3xl` с анимацией `scale: [1, 1.5, 1]`.

---

## Форма захвата лида

Находится в `FinalCTA.tsx`. Отправляет на вебхук:
- URL: `https://n8n.aiflownow.ru/webhook/lead`
- Метод: `POST`
- Заголовок: `X-Webhook-Token: CTF-2025-LEAD`
- Поля: `name`, `method` (Telegram / Почта / Телефон), `telegram`, `email`, `phone`
- Успех: редирект на `/thanks`
- Открывается через `window.dispatchEvent(new Event("openDemoModal"))`

---

## Сборка и деплой

```bash
# Локальная сборка (результат в docs/)
npm run build

# Обновить контейнер на 4444 без пересборки образа
docker cp ./docs/. ctf-site-prod-test:/app/docs
docker restart ctf-site-prod-test

# Полная пересборка образа
docker compose up -d --build
```

Vite конфиг важные детали:
- `base: './'` — относительные пути, нужно для GitHub Pages
- `outDir: 'docs'` — сборка сразу в `docs/`
- Алиасы для versioned-импортов (типа `@radix-ui/react-slot@1.1.2`) прописаны в `vite.config.ts`
- `figma:asset/...` → `src/assets/e670149348a17ae91dd5f254be5036d57e752682.png` (логотип из Figma)

---

## Что ещё предстоит сделать

- [ ] Мобильное меню (бургер) в `Header.tsx` — Sheet из shadcn/ui
- [x] Страница «Внедрение под ключ» (`/custom`) — готова, `src/components/turnkey/`
- [ ] Страница «Кейсы» — добавить в меню после наполнения
- [ ] Оптимизировать `public/step1..5.png` (по 2–4 МБ каждая, ~14 МБ суммарно) — пережать/в WebP
- [ ] Code-splitting (бандл >500кБ, предупреждение при сборке)

---

## Что нельзя делать

- Не добавлять пункты меню без готовой страницы — «мёртвые» ссылки бьют по доверию
- Не вешать полное меню на страницу `/ai-manager` — это конверсионный лендинг, меню снижает конверсию
- Выпадающее меню с одним пунктом — антипаттерн, пока продуктов один — прямая ссылка
