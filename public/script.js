// Получаем поле телефона
const phoneInput = document.getElementById('telephone');

// Задаём маску
const maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

// Применяем маску
IMask(phoneInput, maskOptions);

// Регистрация
const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
    telephone: form.telephone.value,
  };

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  const result = await res.json();
  alert(result.message || result.error);
});

// Загрузка файла
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(uploadForm);

  const res = await fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();
  alert(result.message || result.error);
});