# ClickToFuture — сайт-витрина + продуктовые лендинги

## Что за проект

Сайт компании ClickToFuture (внедрение ИИ в бизнес). Состоит из:
- **Главной страницы-витрины** — знакомит с компанией, ведёт на продукты и к форме захвата лида
- **Лендинга продукта «ИИ менеджер»** — конверсионная страница, минимум навигации

**Деплой:** боевой прод — контейнер `site-container` за Traefik на домене `clicktofuture.ru`. `Dockerfile.prod` собирает статику (`npm run build` → `docs/`) внутри образа и раздаёт её через `serve -s docs`. Подробнее — в разделе «Сборка и деплой». GitHub Pages больше не используется.

> `docs/` — это скомпилированный бандл, он **в git не хранится** (`.gitignore`): собирается локально `npm run build` и заново пересобирается в образе при деплое. Раньше его коммитили — из-за меняющихся хэшей в именах файлов это плодило шум в каждом PR.

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
| `/cases` | `CasesPage` | «Кейсы» — витрина реальных внедрений (полное меню) |
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

### Кейсы (`src/components/cases/`)
- `casesData.ts` — данные кейсов (`CaseStudy[]`): тизер, отрасль, большая метрика, секции «Как было / Сколько теряли / Как стало / Результат». Текст хранится с markdown-разметкой `**жирного**` и `[ссылок](/url)`.
- `CasesPage.tsx` — сборка: `Header` + герой + сетка карточек + `FinalCTA`:
  - `RotatingWord` — **сменяющееся слово в герое** (по мотивам modal.com/customers): «Внедряем ИИ-агентов / ИИ-менеджеров / …». Вертикальный «ролик» — слово уезжает вниз и скрывается за `overflow-hidden`, сверху синхронно опускается следующее (`AnimatePresence` mode sync, `initial={false}`, `y: -110% → 0 → 110%`). Пауза ~2.2 с через `setInterval`. Неон `#00D1FF` + `textShadow`-свечение.
  - `RichText` — рендерит `**жирное**` (белый акцент) и `[label](/url)` (внутренний `Link`) из строк данных.
  - `CaseCard` — кликабельная карточка (метрика + тизер), `whileHover` приподнимает; открывает `CaseModal`.
  - `CaseModal` — детальная карточка-модалка: блокирует скролл фона, закрытие по Esc/бэкдропу. Внизу — скриншоты кейса, если есть.
  - `CaseGallery` — просмотрщик скриншотов (shadcn `Carousel`): одно фото крупно + листание свайпом/стрелками/точками. Показывается, если у кейса задан массив `images`; иначе — заглушка под фото (`Camera`, «Фото скоро появится»).
  - Скриншоты кейсов лежат в `src/assets/images/` и импортируются в `casesData.ts` (тип `CaseImage = { src, alt }`, поле `images?` у кейса). Фото есть у кейсов `tnved` (ТН ВЭД), `ai-manager` (панель) и `auto-request` (Альтернативные технологии); у `duplicates` пока заглушка.

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

**Боевой прод — контейнер `site-container`** (compose-сервис `web`, образ `site-web`), за реверс-прокси **Traefik** (`n8n-traefik-1`, сеть `proxy`, лейбл `Host(clicktofuture.ru) || Host(www.clicktofuture.ru)`). `Dockerfile.prod` запекает статику в образ (`COPY . .` → `npm run build` внутри), тома не монтируются — поэтому `docker cp docs/` в боевой контейнер бесполезно, нужна пересборка образа.

```bash
# Локальная сборка (результат в docs/, gitignore) — для проверки перед деплоем
npm run build

# ДЕПЛОЙ В ПРОД: пересобрать образ и пересоздать site-container (Traefik подхватит сам)
docker compose up -d --build

# Проверить, что домен отдаёт свежий бандл
curl -s https://clicktofuture.ru/ | grep -oE 'assets/index-[A-Za-z0-9_]+\.js'
```

> `ctf-site-prod-test` (host-порт 4444, сеть `bridge`, без Traefik-лейблов) — старый локальный тест-контейнер, к домену отношения не имеет. Деплой через `docker cp` в него на боевой сайт НЕ влияет.

Vite конфиг важные детали:
- `base: './'` — относительные пути (раздаётся из подпапки `docs/` через `serve`)
- `outDir: 'docs'` — сборка сразу в `docs/`
- Алиасы для versioned-импортов (типа `@radix-ui/react-slot@1.1.2`) прописаны в `vite.config.ts`
- `figma:asset/...` → `src/assets/e670149348a17ae91dd5f254be5036d57e752682.png` (логотип из Figma)

---

## Что ещё предстоит сделать

- [ ] Мобильное меню (бургер) в `Header.tsx` — Sheet из shadcn/ui
- [x] Страница «Внедрение под ключ» (`/custom`) — готова, `src/components/turnkey/`
- [x] Страница «Кейсы» (`/cases`) — готова, `src/components/cases/`. Фото добавлены в кейсы `tnved`, `ai-manager`, `auto-request`; осталось у `duplicates`
- [x] Оптимизировать картинки шагов — переведены в WebP (`src/assets/steps/*.webp`, ~14 МБ → ~0.6 МБ), оригиналы в `design-src/`
- [ ] Code-splitting (бандл >500кБ, предупреждение при сборке)
- [ ] Скриншоты кейсов — PNG (`alttech-*` ~100–200 КБ, `tnved` ~190 КБ). При желании пережать/в WebP, но это текстовые скрины — важна чёткость

---

## Что нельзя делать

- Не добавлять пункты меню без готовой страницы — «мёртвые» ссылки бьют по доверию
- Не вешать полное меню на страницу `/ai-manager` — это конверсионный лендинг, меню снижает конверсию
- Выпадающее меню с одним пунктом — антипаттерн, пока продуктов один — прямая ссылка
