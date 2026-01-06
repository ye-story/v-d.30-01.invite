const main = document.querySelector('main');

const img1 = document.getElementById('img1');

const imgWrappers = [...document.querySelectorAll('.img-wrapper')];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const baseImgPath = './img/guests/';

let finalSrc = './img/common.webp'; // Путь по умолчанию

if (+id && !isNaN(+id) && (+id <= 24) && (+id > 0)) { 
  finalSrc = baseImgPath + `${id}.webp`; 
}

img1.onload = () => {
  img1.classList.add('loaded');
};


img1.src = finalSrc;

const imgs = [...document.querySelectorAll('.img-wrapper img')];

imgWrappers.forEach((imgWrapper) => {
  if (!imgWrapper.querySelector('img').src.includes('img')) {
    imgWrapper.style.display = 'none';
  }
});
