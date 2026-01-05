const main = document.querySelector('main');

const img1 = document.getElementById('img1');

const imgWrappers = [...document.querySelectorAll('.img-wrapper')];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const baseImgPath = './img/guests/';

if (+id && !isNaN(+id) && (+id <= 24) && (+id > 0)) { 
 img1.src = baseImgPath + `${id}.webp`; 
}
else {
  img1.src = './img/common.webp';
}

const imgs = [...document.querySelectorAll('.img-wrapper img')];

imgWrappers.forEach((imgWrapper) => {
  if (!imgWrapper.querySelector('img').src.includes('img')) {
    imgWrapper.style.display = 'none';
  }
});
