const express = require('express');
const app = express();
const PORT = 3000;

// Middleware для обработки JSON и form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статическая папка (чтобы отдать HTML/CSS/JS)
app.use(express.static('public'));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
