document.body.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    if(event.target.classList.contains("button__showmodal")) {
        document.getElementById("contact__dialog").showModal();
    }
});