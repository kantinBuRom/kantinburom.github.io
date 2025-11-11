const securityConfig = {
  maxLength: 100,
  namePattern: /^[a-zA-Z\u00C0-\u00FF\s]+$/, // /^[a-zA-Z\s]+$/,
  addressPattern: /^[a-zA-Z0-9\s,./-]+$/,
  classPattern: /^[a-zA-Z0-9\s-]+$/,
  submissionLimit: 5,
  submissionTimeout: 60000,
};

let formState = {
  name: { valid: false, value: "" },
  address: { valid: true, value: "" },
  className: { valid: true, value: "" },
};

let submissionAttempts = 0;
let lastSubmissionTime = Date.now();

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

function isRateLimited() {
  const currentTime = Date.now();
  const timeDiff = currentTime - lastSubmissionTime;

  if (timeDiff > securityConfig.submissionTimeout) {
    submissionAttempts = 0;
    lastSubmissionTime = currentTime;
  }

  if (submissionAttempts >= securityConfig.submissionLimit) {
    swal("Too many attempts\nTerlalu banyak percobaan", "You have exceeded the maximum number of submissions. Please try again later. Tunggu 1 menit\nAnda telah melebihi jumlah maksimum pengiriman. Silakan coba lagi nanti. Tunggu 1 menit", "error");
    return true;
  }
  submissionAttempts++;
  return false;
}

function setSecureCookie(){
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  // document.cookie = `userName=${formState.name.value};address=${formState.address.value};class=${formState.className.value};expires=${expires.toUTCString()};secure SameSite=None; HttpOnly path=/`;
  // document.cookie = `userName=${formState.name.value};userAddress=${formState.address.value};userClass=${formState.className.value};expires=${expires.toUTCString()};secure;SameSite=Strict;path=/`;
  document.cookie = `userName=${formState.name.value}; expires=${expires.toUTCString()}; secure; SameSite=Strict; path=/`;
  document.cookie = `userAddress=${formState.address.value}; expires=${expires.toUTCString()}; secure; SameSite=Strict; path=/`;
  document.cookie = `userClass=${formState.className.value}; expires=${expires.toUTCString()}; secure; SameSite=Strict; path=/`;

  console.log(`Login at: ${new Date().toLocaleString()}`);
}

function checkAndRefreshCookie() {
  const cookies = document.cookie.split("; ");
  let cookieFound = false;

  cookies.forEach(cookie => {
    const [name] = cookie.split("=");
    
    if (name === "userName" || name === "userAddress" || name === "userClass") {
      cookieFound = true;
    }
  });

  if (!cookieFound) {
    console.log("Cookie expired or missing. Refreshing cookies.");
    setSecureCookie();
  }
}


function submitForm() {
  if (isRateLimited()) {
    return;
  }

  if (!formState.name.valid) {
    shakeElement(document.getElementById("name"));
    return;
  }

  try {
    sessionStorage.setItem("userName", formState.name.value);
    sessionStorage.setItem("userAddress", formState.address.value);
    sessionStorage.setItem("userClass", formState.className.value);

    setSecureCookie();
    checkAndRefreshCookie();

    window.location.href = "menu.html";
  } catch (error) {
    console.error("Error storing form data:", error);
    // alert('Terjadi kesalahan. Silakan coba lagi.');
    swal("Terjadi kesalahan", "Silakan coba lagi.");
  }
  console.log(`Login at: ${new Date().toLocaleString()}`);
}

function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 500);
}

document.addEventListener("DOMContentLoaded", function () {
  initConnectionStatus()
  sessionStorage.clear();

  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.value = "";
    validateInput(input, input.id);
  });
});

function initConnectionStatus() {
  window.addEventListener("offline", () => showConnectionAlert("offline"));
  window.addEventListener("online", () => showConnectionAlert("online"));
}

function showConnectionAlert(status) {
  const message = status === "offline" ? "Kamu Offline" : "Kamu Online";
  
  // Menggunakan textContent untuk mencegah XSS
  const alertMessage = document.createElement('div');
  alertMessage.textContent = message;
  
  alert(alertMessage.textContent);
}


(function () {
  let deferredPrompt = null;
  const banner = document.getElementById('pwa-install-banner');
  const installBtn = document.getElementById('pwa-install-btn');
  const dismissBtn = document.getElementById('pwa-dismiss-btn');

  const iosModal = document.getElementById('pwa-ios-modal');
  const iosClose = document.getElementById('pwa-ios-close');

  const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = () =>
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true;

  function showBanner() {
    if (!banner) return;
    banner.classList.add('show');
    banner.setAttribute('aria-hidden', 'false');
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('show');
    banner.setAttribute('aria-hidden', 'true');
  }

  function showIosModal() {
    if (!iosModal) return;
    iosModal.classList.add('show');
    iosModal.setAttribute('aria-hidden', 'false');
  }

  function hideIosModal() {
    if (!iosModal) return;
    iosModal.classList.remove('show');
    iosModal.setAttribute('aria-hidden', 'true');
  }

  window.addEventListener('load', () => {
    if (isStandalone()) {
      hideBanner();
      hideIosModal();
      return;
    }

    if (isIos()) {
      showIosModal();
    }
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showBanner();
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        if (isIos()) showIosModal();
        return;
      }

      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice && choice.outcome === 'accepted') {
        hideBanner();
        deferredPrompt = null;
        try {
          const reg = await navigator.serviceWorker.ready;
          reg.showNotification('Terima kasih!', {
            body: 'Aplikasi berhasil dipasang. Selamat menggunakan Warung Bu Rom!',
            icon: '/image/IMG-11022025-buRom.webp'
          });
        } catch (err) { /* ignore */ }
      } else {
        hideBanner();
      }
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      hideBanner();
    });
  }

  window.addEventListener('appinstalled', () => {
    hideBanner();
    hideIosModal();
    console.log('PWA installed');
  });

  if (iosClose) {
    iosClose.addEventListener('click', hideIosModal);
  }

  window.pwaInstall = {
    showBanner,
  };
})();