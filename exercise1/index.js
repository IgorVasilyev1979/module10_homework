const btn = document.querySelector('.j-btn-test');
const btnIcon1 = document.querySelector('.btn_icon1');
const btnIcon2 = document.querySelector('.btn_icon2');

btn.addEventListener('click', () => {
    btnIcon1.classList.toggle('btn_icon_active');
    btnIcon2.classList.toggle('btn_icon_active');
});