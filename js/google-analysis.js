// ========== Count-Up Animation ==========
function animateCountUp(el, target) {
    let current = 0;
    const duration = 1200;
    const increment = Math.ceil(target / (duration / 16));

    function update() {
        current += increment;
        if (current >= target) {
            el.innerText = target;
        } else {
            el.innerText = current;
            requestAnimationFrame(update);
        }
    }
    update();
}

// ========== Visitor Counter (CountAPI) ==========
(function () {
    const namespace = 'chuzytech-portfolio';
    const key = 'visits';
    const display = document.getElementById('visitorCount');

    function showValue(val) {
        if (display) animateCountUp(display, val);
    }

    if (!localStorage.getItem('chuzytech_counted')) {
        fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
            .then(res => res.json())
            .then(data => {
                showValue(data.value);
                try { localStorage.setItem('chuzytech_counted', '1'); } catch (e) { }
            })
            .catch(() => display.innerText = 'N/A');
    } else {
        fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
            .then(res => res.json())
            .then(data => showValue(data.value))
            .catch(() => display.innerText = 'N/A');
    }
})();

// ========== Cookie Consent + Google Analytics ==========
document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookieConsent");
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    if (!localStorage.getItem("cookiesAccepted") && !localStorage.getItem("cookiesDeclined")) {
        setTimeout(() => {
            cookieBanner.style.transform = "translateY(0)";
            cookieBanner.style.opacity = "1";
        }, 500);
    } else if (localStorage.getItem("cookiesAccepted")) {
        loadGoogleAnalytics();
    }

    acceptBtn.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        hideBanner();
        loadGoogleAnalytics();
    });

    declineBtn.addEventListener("click", function () {
        localStorage.setItem("cookiesDeclined", "true");
        hideBanner();
    });

    function hideBanner() {
        cookieBanner.style.transform = "translateY(150%)";
        cookieBanner.style.opacity = "0";
        setTimeout(() => cookieBanner.style.display = "none", 600);
    }

    function loadGoogleAnalytics() {
        if (!window.GA_LOADED) {
            window.GA_LOADED = true;
            let ga = document.createElement("script");
            ga.async = true;
            ga.src = "https://www.googletagmanager.com/gtag/js?id=G-YOURID"; // <-- Replace with your GA ID
            document.head.appendChild(ga);

            ga.onload = function () {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-YOURID'); // <-- Replace with your GA ID
            };
        }
    }

    // ========== Enable Bootstrap Tooltips ==========
    document.addEventListener("DOMContentLoaded", function () {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    });

});