const form = document.getElementById("signupForm");
const signup = document.getElementById("signup");
const successMessage = document.getElementById("successMessage");
const successButton = document.getElementById("successButton");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


/**
 * Handles the submit event of the sign-up form.
 * 
 * Prevents the default HTTP request, validates all form controls and 
 * switches the UI into the success message if no errors occur.
 * 
 * @param {SubmitEvent} e 
 */
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  let hasError = false;

  for (const [key, value] of Object.entries(data)) {
    const missingRequired = checkMissingRequired(key, value);
    const invalid = checkInvalid(key, value);
    if (missingRequired || invalid) hasError = true;
  }

  if (!hasError) {
    cleanup();
    showSuccess(data.email);
  }
}


/**
 * Shows the success Message and injects the confirmed e-mail address.
 * 
 * @param {string} email - The e-mail adress that was successfully submitted.
 * @returns {void} 
 */
function showSuccess(email) {
  const successEmail = document.getElementById("successEmail");
  successEmail.innerHTML = email;
  signup.classList.add("hidden");
  successMessage.classList.remove("hidden");
}


/**
 * Reverts the UI back to the sign-up view and resets the form.
 * 
 * @returns {void}
 */
function dismiss() {
  const successEmail = document.getElementById("successEmail");
  successEmail.innerHTML = "";
  cleanup();
  successMessage.classList.add("hidden");
  signup.classList.remove("hidden");
}



/**
 * Checks whether a required form field is missing a value.
 * 
 * @param {string} key - The `name` attribute of the form control.
 * @param {string} value - The control's current value.
 * @returns {boolean} `true` if the field is required and empty.
 */
function checkMissingRequired(key, value) {
  const fields = form.querySelectorAll("input, select, textarea");

  for (const field of fields) {
    if (field.name === key) {
      if (field.hasAttribute("required") && value === "") {
          markInvalid(field, key);
          return true;
        }
    }
  }
  return false;
}


/**
 * Checks whether the given field value fails custom validity rules.
 * 
 * @param {string} key - The `name` attribute of the form control.
 * @param {string} value - The control's current value.
 * @returns {boolean} `true` if the field is invalid.
 */
function checkInvalid(key, value) {
  const fields = form.querySelectorAll("input, select, textarea");

  for (const field of fields) {
    const type = field.getAttribute("type");
    if (field.name === key) {
      if (type === "email" && !emailRegex.test(value)) {
        markInvalid(field, key);
        return true;
      }
    }
  }

  return false;
}



/**
 * Adds visual and accessibility error indicators to a field.
 *
 * @param {HTMLElement} field – The form control to decorate.
 * @param {string} key        – Field name used to locate the error <span>.
 * @returns {void}
 */
function markInvalid(field, key) {
  field.classList.add("touched");
  field.setAttribute("aria-invalid", "true");
  document.getElementById(`${key}Error`)?.classList.add("error-message--show");
}


/**
 * Resets all form controls, removes validation styles/messages
 * and clears `aria-invalid` flags.
 *
 * @returns {void}
 */
function cleanup() {
  const fields = form.querySelectorAll("input, select, textarea");

  for (const field of fields) {
    field.value = "";
    field.classList.remove("touched");
    field.setAttribute("aria-invalid", "false");
  }

  form.querySelectorAll(".error-message").forEach((span) => {
    span.classList.remove("error-message--show");
  });
}




form.addEventListener("submit", handleSubmit);
successButton.addEventListener("click", dismiss);
