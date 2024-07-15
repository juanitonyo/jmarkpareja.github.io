document.addEventListener('DOMContentLoaded', () => {
    const topBar = document.getElementById('top-bar');
    let isHovering = false;
    let isScrolling = false;

    // Initial state: top bar is visible
    topBar.style.opacity = 1;

    // Toggle top bar visibility on scroll
    window.addEventListener('scroll', () => {
        isScrolling = true;
        const scrollTop = window.scrollY;
        const fadeStart = 0; // 0px scroll or top of the page
        const fadeUntil = 100; // 100px scroll
        let opacity = 1;

        // Calculate opacity based on scroll position
        if (scrollTop <= fadeStart) {
            opacity = 1;
        } else if (scrollTop <= fadeUntil) {
            opacity = 1 - (scrollTop / fadeUntil);
        } else {
            opacity = 0;
        }

        // Update top bar opacity only if not hovering and not at top
        if (!isHovering && scrollTop > fadeStart) {
            topBar.style.opacity = opacity;
        }
    });

    // Show top bar on hover over upper part of window view, except at top
    window.addEventListener('mousemove', (event) => {
        const mouseY = event.clientY;
        const scrollTop = window.scrollY;
        if (mouseY <= 50 && scrollTop > 0) { // Adjust the value (50) as needed for the upper part threshold
            topBar.style.opacity = 1;
            isHovering = true;
        } else {
            if (!isScrolling && scrollTop > 0) {
                topBar.style.opacity = 0;
                isHovering = false;
            }
        }
    });

    // Smooth scroll to section on button click
    const buttons = document.querySelectorAll('#nav button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const topOffset = targetElement.offsetTop - document.getElementById('top-bar').offsetHeight;
                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reset scrolling state after a short delay
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            isScrolling = false;
        }, 50);
    });
});
