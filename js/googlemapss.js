// CODING FOR IOS BROOOOOO

console.log(
  '%c✦ Welcome to My Professional Portfolio ✦%c\n\n' + 
  '%c🌟 Social Media Profile 🌟%c\n' +
  '%c╭─────────────────────────╮%c\n' +
  '%c│ %c📱 Instagram:%c %s%c │\n' +
  '%c│ %c💻 GitHub:%c %s%c    │\n' +
  '%c╰─────────────────────────╯%c\n\n' +
  '%c✨ Let\'s Connect and Create Something Amazing! ✨',
  
  // Welcome header - with premium gradient
  'color: #ffffff; background: linear-gradient(45deg, #00ff87, #60efff); font-size: 26px; font-weight: bold; padding: 15px; border-radius: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); margin: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);',
  '',
  
  // Section header - elegant purple
  'color: #b19cd9; font-size: 22px; font-weight: bold; text-align: center; padding: 10px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);',
  '',
  
  // Box top border
  'color: #60efff; font-size: 16px;',
  '',
  
  // Box content alignment
  'color: #ffffff;',
  // Instagram label
  'color: #00ff87; font-size: 18px; font-weight: bold;',
  // Instagram username style
  'color: #60efff; font-size: 18px; cursor: pointer;',
  // Instagram URL
  'https://instagram.com/Indradwi.25',
  // Box continuation
  'color: #60efff;',
  
  // Box middle
  'color: #60efff;',
  // GitHub label
  'color: #00ff87; font-size: 18px; font-weight: bold;',
  // GitHub username style
  'color: #60efff; font-size: 18px; cursor: pointer;',
  // GitHub URL
  'https://github.com/Xnuvers007',
  // Box continuation
  'color: #60efff;',
  
  // Box bottom border
  'color: #60efff; font-size: 16px;',
  '',
  
  // Footer - elegant styling
  'color: #b19cd9; font-size: 18px; font-weight: bold; text-align: center; padding: 10px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); font-style: italic;'
);


document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById('lazyIframe');
    const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3738166352805!2d106.68896592415025!3d-6.345614212081687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5a6e26dc3cd%3A0xccd6344b8021119d!2sPamulang%20University%20Campus%202%20(UNPAM%20Viktor)!5e0!3m2!1sen!2sid!4v1739282816919!5m2!1sen!2sid";

    // Function to detect Safari on iOS
    function isSafariOniOS() {
        const ua = navigator.userAgent;
        return ua.includes('Safari') && ua.includes('Mobile') && !ua.includes('Chrome');
    }

    // Function to detect iOS version
    function getiOSVersion() {
        const ua = navigator.userAgent;
        const match = ua.match(/OS (\d+)_/);
        return match ? parseInt(match[1], 10) : null;
    }

    // Check if Safari on iOS < 16.4
    const isUnsupportedSafari = isSafariOniOS() && getiOSVersion() < 16.4;

    if (isUnsupportedSafari) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    iframe.src = src;
                    observer.unobserve(iframe);
                }
            });
        });

        observer.observe(iframe);
    } else {
        iframe.src = src;
        iframe.setAttribute('loading', 'lazy');
    }
});
