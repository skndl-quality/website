// Получаем поле телефона
const phoneInput = document.getElementById('telephone');

// Задаём маску
const maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

// Применяем маску
IMask(phoneInput, maskOptions);
