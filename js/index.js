const securityConfig = {
  maxLength: 100,
  namePattern: /^[a-zA-Z\s]+$/,
  addressPattern: /^[a-zA-Z0-9\s,./-]+$/,
  classPattern: /^[a-zA-Z0-9\s-]+$/,
};

let formState = {
  name: { valid: false, value: "" },
  address: { valid: true, value: "" },
  className: { valid: true, value: "" },
};

let lastValidation = Date.now();
const VALIDATION_THROTTLE = 100;

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return DOMPurify.sanitize(input.slice(0, securityConfig.maxLength));
}

const validateInput = throttle(function (element, type) {
  const value = sanitizeInput(element.value.trim());
  const errorElement = document.getElementById(`${type}Error`);

  switch (type) {
    case "name":
      formState.name.valid = securityConfig.namePattern.test(value);
      formState.name.value = value;
      if (errorElement) {
        const isValidName = value.length >= 3;
        formState.name.valid =
          isValidName && securityConfig.namePattern.test(value);
        formState.name.value = value;
        errorElement.style.display = isValidName || !value ? "none" : "block";
      }
      break;
    case "address":
      formState.address.valid =
        !value || securityConfig.addressPattern.test(value);
      formState.address.value = value;
      break;
    case "class":
      formState.className.valid =
        !value || securityConfig.classPattern.test(value);
      formState.className.value = value;
      break;
  }

  updateFormProgress();
  updateNextButton();
}, VALIDATION_THROTTLE);

function updateFormProgress() {
  const requiredFields = ["name"];
  const filledFields = requiredFields.filter(
    (field) => formState[field].value.length > 0
  );
  const progress = (filledFields.length / requiredFields.length) * 100;

  document.getElementById("formProgress").style.width = `${progress}%`;
}

function updateNextButton() {
  const nextButton = document.getElementById("nextButton");
  const isValid =
    formState.name.valid &&
    formState.address.valid &&
    formState.className.valid;

  nextButton.disabled = !isValid;
  nextButton.classList.toggle("active", isValid);
}

function submitForm() {
  if (!formState.name.valid) {
    shakeElement(document.getElementById("name"));
    return;
  }

  try {
    sessionStorage.setItem("userName", formState.name.value);
    sessionStorage.setItem("userAddress", formState.address.value);
    sessionStorage.setItem("userClass", formState.className.value);

    window.location.href = "menu.html";
  } catch (error) {
    console.error("Error storing form data:", error);
    // alert('Terjadi kesalahan. Silakan coba lagi.');
    swal("Terjadi kesalahan", "Silakan coba lagi.");
  }
}

function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 500);
}

document.addEventListener("DOMContentLoaded", function () {
  sessionStorage.clear();

  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.value = "";
    validateInput(input, input.id);
  });
});
