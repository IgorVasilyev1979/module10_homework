const btn = document.querySelector('.j-btn');

btn.addEventListener('click', () => {
    window.alert(`Ширина экрана: ${window.screen.width} пикселей, высота экрана: ${window.screen.height} пикселей`);
});