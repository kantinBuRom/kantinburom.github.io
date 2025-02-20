// CODING FOR IOS BROOOOOO

console.log('%c%s', 
'color: green; background: yellow; font-size: 24px;',
"Helooooo :3\nDon't forget to follow my Instagram: %chttps://instagram.com/Indradwi.25",
'color: blue; text-decoration: underline; font-size: 24px;'
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
