const form = document.getElementById('contact__form');
const inputList = form.querySelectorAll('input');

inputList.forEach((i) => {
    i.addEventListener("input", (e) => {
        removeError(e.target);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validate(form)) {
        // backend request
        window.contact__dialog.close();
        document.getElementById("super__dialog").showModal();
    }
});

function validate(form) {
    let isValid = true;

    inputList.forEach(i => {
        if(i.dataset.required == "true") {
            removeError(i);
            if(!validateNotNull(i.value)) {
                throwError(i, "This field is required.");
                isValid = false;
            }
            if(i.id == "email") {
                if(!validateEmail(i.value)) {
                    throwError(i, "Invalid email.");
                    isValid = false;
                }
            }
        }
    });

    return isValid;
}

function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validateNotNull(value) {
    return value.trim();
}

function throwError(input, text) {
    const parent = input.parentNode;

    const errorLabel = document.createElement("label");
    errorLabel.classList.add("error__field");
    errorLabel.textContent = text;

    parent.classList.add("input__error");
    parent.append(errorLabel);
}

function removeError(input) {
    const parent = input.parentNode;
    if(parent.classList.contains("input__error")) {
        parent.querySelectorAll(".error__field").forEach(a => a.remove());
        parent.classList.remove("input__error");
    }
}