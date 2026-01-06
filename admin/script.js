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

  const card = document.createElement('div');
  card.classList.add('guest-card');

  // Номер 01, 02...
  const numberElem = document.createElement('div');
  numberElem.classList.add('card-number');
  numberElem.textContent = (index + 1).toString().padStart(2, '0');

  // Имя
  const titleElem = document.createElement('div');
  titleElem.classList.add('name__title');
  titleElem.textContent = name.names;

  // --- БЛОК КНОПОК (ВСЁ В ОДНУ СТРОКУ) ---
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  // 1. Кнопка "Открыть" (глаз) - вместо длинной ссылки
  const btnOpen = document.createElement('a');
  btnOpen.className = 'btn-action btn-open';
  btnOpen.href = link;
  btnOpen.target = '_blank';
  btnOpen.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';
  btnOpen.title = "Открыть приглашение";

  // 2. Кнопка "Копировать"
  const btnCopy = document.createElement('button');
  btnCopy.className = 'btn-action btn-copy';
  btnCopy.dataset.link = link;
  // На мобильном можно оставить только иконку или короткий текст
  btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i> Копия';

  // 3. Viber
  const btnViber = document.createElement('a');
  btnViber.className = 'btn-action btn-share viber';
  btnViber.href = 'viber://forward?text=' + encodeURIComponent(link);
  btnViber.target = '_blank';
  btnViber.innerHTML = '<i class="fa-brands fa-viber"></i>';

  // 4. Telegram
  const btnTg = document.createElement('a');
  btnTg.className = 'btn-action btn-share telegram';
  btnTg.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Приглашение на свадьбу')}`;
  btnTg.target = '_blank';
  btnTg.innerHTML = '<i class="fa-brands fa-telegram"></i>';

  actionsDiv.append(btnOpen, btnCopy, btnViber, btnTg);
  
  card.append(numberElem, titleElem, actionsDiv);
  container.append(card);
});

// Логика копирования
container.addEventListener('click', (e) => {
  const btnCopy = e.target.closest('.btn-copy');

  if (btnCopy) {
    const linkUrl = btnCopy.dataset.link;
    
    navigator.clipboard.writeText(linkUrl)
      .then(() => {
        const originalContent = btnCopy.innerHTML;
        
        btnCopy.classList.add('copied');
        btnCopy.innerHTML = '<i class="fa-solid fa-check"></i>'; // Галочка при успехе

        setTimeout(() => {
          btnCopy.classList.remove('copied');
          btnCopy.innerHTML = originalContent;
        }, 1500); // Чуть быстрее возвращаем (1.5с)
      })
      .catch((err) => {
        console.error('Ошибка:', err);
      });
  }
});