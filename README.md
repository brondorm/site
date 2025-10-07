# AI Support Assistant

Полноценное окружение для запуска лендинга перенесено в этот репозиторий. Проект построен на [Vite](https://vitejs.dev/) с React и TypeScript, стили оформлены при помощи Tailwind CSS и дизайн-системы shadcn/ui.

## Быстрый старт

```bash
npm install
npm run dev
```

Дев-сервер стартует на `http://localhost:5173`. Для production-сборки используйте `npm run build`, а статический превью можно открыть командой `npm run preview`.

## Стек и основные пакеты

- **Vite + React 18 + TypeScript** — основа приложения и инструменты сборки.
- **Tailwind CSS** с `tailwindcss-animate`, `tailwind-merge` и CSS-переменными из `src/styles/globals.css`.
- **Компоненты shadcn/ui** на базе `@radix-ui/react-*` и `lucide-react`.
- **Анимации** построены на [`motion`](https://motion.dev/).
- **Дополнительные библиотеки**: `react-hook-form`, `react-day-picker`, `embla-carousel-react`, `sonner`, `vaul` и др.

Полный список зависимостей приведён в `package.json`.

## Структура каталогов

```
├── index.html              # HTML-шаблон Vite
├── src
│   ├── App.tsx             # Корневой компонент страницы
│   ├── main.tsx            # Точка входа приложения
│   ├── components          # JSX-компоненты и UI-библиотека
│   └── styles              # Tailwind и пользовательские стили
├── tailwind.config.ts      # Настройки Tailwind CSS
├── postcss.config.js       # Конфигурация PostCSS
├── tsconfig*.json          # Конфигурации TypeScript
└── vite.config.ts          # Конфигурация Vite
```

## Примечания

- Все импорты библиотек приведены к стандартному виду без ручных суффиксов версий.
- Для корректной генерации классов Tailwind важно, чтобы IDE или билд выполняли команды Tailwind/Vite — убедитесь, что `npm run dev` работает в фоне при разработке.
- Если вы запускаете проект на Node.js версии ниже 18.18, обновите среду — Vite 5 требует современный рантайм.
