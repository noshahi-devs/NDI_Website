document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const closeBtn = document.getElementById("closeMenu");

    // ===== STICKY GLASS EFFECT ON SCROLL =====
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("glassy");
        } else {
            nav.classList.remove("glassy");
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => {
            navLinks.classList.add("show");
            document.body.style.overflow = "hidden"; // Prevent scroll
        };
    }

    if (closeBtn && navLinks) {
        closeBtn.onclick = () => {
            navLinks.classList.remove("show");
            document.body.style.overflow = "auto"; // Restore scroll
        };
    }

    // ===== BACK TO TOP & WHATSAPP =====
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    if (backToTop) {
        backToTop.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }
});
