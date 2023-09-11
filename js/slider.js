const slider = document.querySelector('.slider');
const len = document.querySelectorAll('.slider section').length;
const carousel = document.querySelector('.carousel');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let direction;
let isSliding = false;
const delay = 1;
let active = 1;

async function dotSlide(dot) {
    while(active != dot.value) {
        if(isSliding) return;
        isSliding = true;

        active++;
        if(active > len) {
            active = 1;
        }

        if(direction === 1) {
            slider.prepend(slider.lastElementChild);
            direction = -1;
        }
        direction = -1;

        carousel.style.justifyContent = 'flex-start';
        await animateSlide(direction);
        await reposition(direction);

        slider.style.transform = 'translate(0)';
        isSliding = false;
    }
    // в отдельный метод вынести, по сути повторение функции внутри next.addeventlistener
    // да и prev. тоже
}

prev.addEventListener('click', async () => {
    if(isSliding) return;
    isSliding = true;

    active--;
    if(active < 1) {
        active = len;
    }
    dots[active - 1].checked = true

    if(direction === -1) {
        slider.appendChild(slider.firstElementChild);
        direction = 1;
    }
    direction = 1;
    carousel.style.justifyContent = 'flex-end';

    await animateSlide(direction);
    await reposition(direction);

    slider.style.transform = 'translate(0)';
    isSliding = false;
});

next.addEventListener('click', async () => {
    if(isSliding) return;
    isSliding = true;

    active++;
    if(active > len) {
        active = 1;
    }
    dots[active - 1].checked = true

    if(direction === 1) {
        slider.prepend(slider.lastElementChild);
        direction = -1;
    }
    direction = -1;
    carousel.style.justifyContent = 'flex-start';

    await animateSlide(direction);
    await reposition(direction);

    slider.style.transform = 'translate(0)';
    isSliding = false;
});

async function reposition(direction) {
    if(direction === -1) {
        slider.appendChild(slider.firstElementChild);
    } else if(direction === 1) {
        slider.prepend(slider.lastElementChild);
    }
}

function animateSlide(direction) {
    return new Promise((resolve) => {
        let max = direction === -1 ? -750 : 750;
        let delta = direction === -1 ? -10 : 10;
        let translate = 0;
        const interval = setInterval(() => {
            translate += delta;
            slider.style.transform = `translate(${translate}px`;
            if(translate == max) {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}