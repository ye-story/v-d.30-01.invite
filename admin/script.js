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

const baseURL = location.href.replace('admin/', ''); //location.origin
const container = document.getElementById('container');

names.forEach((name, index) => {
  const nameElem = document.createElement('div');
  nameElem.classList.add('name');
  const titleNameElem = document.createElement('p');
  titleNameElem.classList.add('name__title');
  titleNameElem.innerHTML = name.names;
  const linkNameElem = document.createElement('a');
  linkNameElem.classList.add('name__link');

  const link = `${baseURL}?id=${name.id}`;
  linkNameElem.href = link;
  linkNameElem.innerHTML = link;
  linkNameElem.target = '_blank';

  const btnCopyLink = document.createElement('button');
  btnCopyLink.innerHTML = 'copy';
  btnCopyLink.classList.add('name__btn-copy');
  btnCopyLink.dataset.link = link;

  const btnShareViber = document.createElement('a');
  btnShareViber.classList.add('name__btn-share-viber');
  btnShareViber.href = 'viber://forward?text=' + link;
  btnShareViber.target = '_blank';

  const btnShareTelegram = document.createElement('a');
  btnShareTelegram.classList.add('name__btn-share-telegram');
  btnShareTelegram.href = `https://telegram.me/share/url?url=${link}&amp;text=${link}`;
  btnShareTelegram.target = '_blank';

  const linkWrapper = document.createElement('div');
  linkWrapper.classList.add('name__link-wrapper');

  linkWrapper.append(
    linkNameElem,
    btnCopyLink,
    btnShareViber,
    btnShareTelegram
  );

  nameElem.append(titleNameElem, linkWrapper);

  container.append(nameElem);
});

container.addEventListener('click', (e) => {
  const btnCopy = e.target;

  if (btnCopy.classList.contains('name__btn-copy')) {
    const linkUrl = btnCopy.dataset.link;
    console.log(linkUrl);
    navigator.clipboard
      .writeText(linkUrl)
      .then(() => {
        console.log('Text copied to clipboard ' + linkUrl);
        btnCopy.innerHTML = 'copied';

        setTimeout(() => {
          btnCopy.innerHTML = 'copy';
        }, 5000);
      })
      .catch((err) => {
        console.error('Error in copying text: ', err);
      });
  }
});
