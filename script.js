const form = document.getElementById("signupForm");
const signup = document.getElementById("signup");
const successMessage = document.getElementById("successMessage");
const successButton = document.getElementById("successButton");

function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    
    
    for (const [key, value] of Object.entries(data)) {
        const required = checkRequired(key, value);
        const valid = checkValid(key, value);
        const noErrors = required + valid == 0;
        if (noErrors) {
            console.log(data);
            cleanup();
            success(data.email);
        }
    }
    
}

function checkRequired(key, value) {
    const fields = form.querySelectorAll("input, select, textarea");

    for (const field of fields) {
        if(field.name === key) {
            if (field.hasAttribute("required")) {
                if(value === "") {
                    field.classList.add("touched");
                    document.getElementById(key + "Error").classList.add("error-message--show");
                    return true;
                }
            }
        }
    }

    return false;
}

function checkValid(key, value) {
    const fields = form.querySelectorAll("input, select, textarea");

    for (const field of fields) {
        const type = field.getAttribute("type");
        if(field.name === key) {
            if (type === "email") {
                emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                    field.classList.add("touched");
                    document.getElementById(key + "Error").classList.add("error-message--show");
                    return true;
                };
            }
        }
    }

    return false;
}


function cleanup() {
    const fields = form.querySelectorAll("input, select, textarea");

    for (const field of fields) {
        field.value = "";
    }
}


function success(email) {
    const successEmail = document.getElementById("successEmail");
    successEmail.innerHTML = email;
    signup.classList.add("hidden");
    successMessage.classList.remove("hidden");
}

function dismiss() {
    const successEmail = document.getElementById("successEmail");
    successEmail.innerHTML = "";
    successMessage.classList.add("hidden");
    signup.classList.remove("hidden");
}

form.addEventListener("submit", handleSubmit);
successButton.addEventListener("click", dismiss);