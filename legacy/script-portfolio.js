/* === PORTFOLIO INTERACTIVE ENGINE === */

document.addEventListener('DOMContentLoaded', () => {

    // 1. CUSTOM CURSOR
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

        // Outline follows with slight lag (via CSS transition)
        cursorOutline.style.transform = `translate(${posX - 16}px, ${posY - 16}px)`;
    });

    // 2. MAGNETIC BUTTONS
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseout', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 3. 3D CARD TILT
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            const tiltX = (y - 0.5) * 20; // max 10deg
            const tiltY = (x - 0.5) * -20;

            el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 4. GSAP REVEAL ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);

    // Kinetic Typography Reveal
    const wordReveals = document.querySelectorAll('.word-reveal');
    gsap.from(wordReveals, {
        y: 100,
        rotateX: -90,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    });

    // Generic Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Initial Stagger for Grid Items
    const bentoItems = document.querySelectorAll('.bento-item');
    if (bentoItems.length > 0) {
        gsap.from(bentoItems, {
            scrollTrigger: {
                trigger: ".section-bento",
                start: "top 80%",
                once: true
            },
            y: 50,
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    // 5. BENTO FILTERING
    const pills = document.querySelectorAll('.pill');
    const items = document.querySelectorAll('.bento-item');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // UI Update
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const category = pill.getAttribute('data-category');

            // Filter Logic
            const visibleItems = [];
            items.forEach(item => {
                const itemCat = item.getAttribute('data-category');

                if (category === 'all' || itemCat === category) {
                    item.style.display = 'block';
                    visibleItems.push(item);
                } else {
                    item.style.display = 'none';
                }
            });

            // Re-animate filtered items
            if (visibleItems.length > 0) {
                gsap.fromTo(visibleItems,
                    { scale: 0.7, y: 50, opacity: 0 },
                    { scale: 1, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                );
            }

            // Refresh ScrollTrigger
            ScrollTrigger.refresh();
        });
    });

});
