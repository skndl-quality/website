const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Чтобы фронтенд мог отправлять запросы сюда
app.use(cors());

// Чтобы парсить JSON из тела запроса
app.use(bodyParser.json());

// Раздача статических файлов из папки public 👈 вот эта строка нужна
app.use(express.static(path.join(__dirname, 'public')));

// Папка для загрузок
const upload = multer({ dest: 'uploads/' });

// Файл с пользователями (простой пример)
const USERS_FILE = path.join(__dirname, 'users.json');

// Функция для чтения пользователей
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Функция для записи пользователей
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Регистрация пользователя
app.post('/register', (req, res) => {
  const { username, email, password, telephone } = req.body;
  if (!username || !email || !password || !telephone) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  const users = readUsers();
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Пользователь с таким email уже есть' });
  }

  users.push({ username, email, password, telephone });
  writeUsers(users);

  res.json({ message: 'Пользователь зарегистрирован' });
});

// Загрузка файла
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не загружен' });
  }
  res.json({ message: 'Файл успешно загружен', filename: req.file.filename });
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
