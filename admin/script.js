const names = [
  { id: "1", names: "Кирилл и Виктория" },
  { id: "2", names: "Влад и Валерия" },
  { id: "3", names: "Красимир и Валерия" },
  { id: "4", names: "Вадим и Алина" },
  { id: "5", names: "Стас и Вероника" },
  { id: "6", names: "Савелий и Екатерина" },
  { id: "7", names: "Олег и Ангелина" },
  { id: "8", names: "Мама, папа и Соня" },
  { id: "9", names: "Юрий и Елена" },
  { id: "10", names: "Юрий и Юлия" },
  { id: "11", names: "Ирина, Мишель и Евгений" },
  { id: "12", names: "Кирилл, Александра и Мария" },
  { id: "13", names: "Ирина и Александр" },
  { id: "14", names: "Татьяна, Стас и Калина" },
  { id: "15", names: "Алексей и Ольга" },
  { id: "16", names: "Дмитрий и Лилия" },
  { id: "17", names: "Мама и Стеша" },
  { id: "18", names: "Яна и Максим" },
  { id: "19", names: "Федор" },
  { id: "20", names: "Стас" },
  { id: "21", names: "Андрей" },
  { id: "22", names: "Лера" },
  { id: "23", names: "Настя" },
  { id: "24", names: "Кристина" }
];

const baseURL = location.href.replace('admin/', '');
const container = document.getElementById('container');

names.forEach((name, index) => {
  const link = `${baseURL}?id=${name.id}`;

  // Создаем карточку
  const card = document.createElement('div');
  card.classList.add('guest-card');

  // Номер в углу (01, 02...)
  const numberElem = document.createElement('div');
  numberElem.classList.add('card-number');
  numberElem.textContent = (index + 1).toString().padStart(2, '0');

  // Имя гостя
  const titleElem = document.createElement('div');
  titleElem.classList.add('name__title');
  titleElem.textContent = name.names;

  // --- ПАНЕЛЬ КНОПОК ---
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  // 1. Большая кнопка ОТКРЫТЬ
  const btnOpen = document.createElement('a');
  btnOpen.className = 'btn-action btn-open';
  btnOpen.href = link;
  btnOpen.target = '_blank';
  // Иконка стрелочки + текст
  btnOpen.innerHTML = '<span style="margin-right:8px"><i class="fa-solid fa-arrow-up-right-from-square"></i></span> Открыть';
  
  // 2. Маленькая кнопка КОПИРОВАТЬ
  const btnCopy = document.createElement('button');
  btnCopy.className = 'btn-action btn-icon btn-copy';
  btnCopy.dataset.link = link;
  btnCopy.title = "Копировать ссылку";
  btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i>';

  // 3. Viber
  const btnViber = document.createElement('a');
  btnViber.className = 'btn-action btn-icon viber';
  btnViber.href = 'viber://forward?text=' + encodeURIComponent(link);
  btnViber.target = '_blank';
  btnViber.title = "Отправить в Viber";
  btnViber.innerHTML = '<i class="fa-brands fa-viber"></i>';

  // 4. Telegram
  const btnTg = document.createElement('a');
  btnTg.className = 'btn-action btn-icon telegram';
  btnTg.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Приглашение на свадьбу')}`;
  btnTg.target = '_blank';
  btnTg.title = "Отправить в Telegram";
  btnTg.innerHTML = '<i class="fa-brands fa-telegram"></i>';

  // Собираем панель и карточку
  actionsDiv.append(btnOpen, btnCopy, btnViber, btnTg);
  card.append(numberElem, titleElem, actionsDiv);
  container.append(card);
});

// Логика копирования
container.addEventListener('click', (e) => {
  // Ищем кнопку, даже если клик был по иконке внутри
  const btnCopy = e.target.closest('.btn-copy');

  if (btnCopy) {
    const linkUrl = btnCopy.dataset.link;
    
    navigator.clipboard.writeText(linkUrl)
      .then(() => {
        const originalContent = btnCopy.innerHTML;
        
        // Визуальный эффект успеха
        btnCopy.classList.add('copied');
        btnCopy.innerHTML = '<i class="fa-solid fa-check"></i>'; // Галочка

        // Возвращаем как было через 1.5 секунды
        setTimeout(() => {
          btnCopy.classList.remove('copied');
          btnCopy.innerHTML = originalContent;
        }, 1500);
      })
      .catch((err) => {
        console.error('Ошибка:', err);
      });
  }
});