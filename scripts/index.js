document.addEventListener('DOMContentLoaded', function() {
    const scrollingTextElements = document.querySelectorAll('.scrolling-text');
    const fonts = [
        '"Palanquin Dark", sans-serif',
        '"Rubik Doodle Shadow", system-ui',
        '"Patrick Hand SC", cursive'
    ];
    let currentFontIndex = 0;

    // Function to handle scrolling of text elements
    function handleScroll(event) {
        const deltaX = event.deltaX;
        const scrollAmount = 20;

        scrollingTextElements.forEach(textElement => {
            const containerWidth = textElement.offsetWidth;
            const contentWidth = textElement.scrollWidth;
            let currentMarginLeft = parseInt(getComputedStyle(textElement).marginLeft);
            
            // Update margin left based on scroll direction
            currentMarginLeft += deltaX > 0 ? scrollAmount : -scrollAmount;
            
            // Check if scrolling exceeds container bounds
            if (currentMarginLeft > 0) {
                currentMarginLeft = -(contentWidth - containerWidth);
            } else if (currentMarginLeft < -(contentWidth - containerWidth)) {
                currentMarginLeft = 0;
            }
            
            textElement.style.marginLeft = currentMarginLeft + 'px';

            // Change font
            textElement.style.fontFamily = fonts[currentFontIndex];
        });

        // Cycle through fonts
        currentFontIndex = (currentFontIndex + 1) % fonts.length;

        event.preventDefault();
    }

    // Listen for wheel event on the document
    document.addEventListener('wheel', handleScroll);

    // Your code for background image changes based on scrolling can go here
    const background = document.querySelector('.background');
    const images = [
        '../assets/images/backgrounds/circle-specs.png',
        '../assets/images/backgrounds/circle-specs2.png',
        '../assets/images/backgrounds/circle-specs3.png',
    ];

    const scrollThreshold = 1500;
    const scrollChange = 100;
    let currentIndex = 0;
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.scrollY;

        if (Math.abs(currentScrollPosition - lastScrollPosition) >= scrollChange) {
            if (currentScrollPosition > scrollThreshold) {
                currentIndex = (currentIndex + 1) % images.length;
                background.style.background = `url(${images[currentIndex]}), var(--offwhite)`;
            } else {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                background.style.background = `url(${images[currentIndex]}), var(--offwhite)`;
            }
            lastScrollPosition = currentScrollPosition;
        }
    });
});
