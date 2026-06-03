# Используем официальный Node.js образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Указываем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
