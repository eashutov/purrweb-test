let dots;

document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.querySelector('.input-box');
    const images = document.querySelectorAll('.slider section');
    index = 1;
    images.forEach((i) => {
        const radio = document.createElement('input');
        if(index === 1) radio.checked = true;
        radio.type = 'radio';
        radio.value = index;
        radio.name = 'nav';
        radio.classList.add('nav');
        inputBox.append(radio);
        radio.addEventListener('click', () => {
            dotSlide(radio);
        });
        
        i.id = index;
        index++;
    });
    document.querySelector('.slider').style.setProperty('width', (images.length * 100) + '%');
    // считать количество изображений и на основе этого крафтить нужное количество инпутов
    dots = document.querySelectorAll('input[type="radio"]');
});