document.addEventListener('DOMContentLoaded', function() {
    const scrollingTextElements = document.querySelectorAll('.scrolling-text');
    const fonts = [
        '"Palanquin Dark", sans-serif',
        '"Rubik Doodle Shadow", system-ui',
        '"Patrick Hand SC", cursive'
    ];
    let currentIndex = 0;

    function handleScroll(event) {
        const deltaX = event.deltaX;
        const scrollAmount = 20;

        scrollingTextElements.forEach(textElement => {
            const containerWidth = textElement.offsetWidth;
            const contentWidth = textElement.scrollWidth;
            let currentMarginLeft = parseInt(getComputedStyle(textElement).marginLeft);
            
            currentMarginLeft += deltaX > 0 ? scrollAmount : -scrollAmount;
            
            if (currentMarginLeft > 0) {
                currentMarginLeft = -(contentWidth - containerWidth);
            } else if (currentMarginLeft < -(contentWidth - containerWidth)) {
                currentMarginLeft = 0;
            }
            
            textElement.style.marginLeft = currentMarginLeft + 'px';
        });

    }

    document.addEventListener('wheel', handleScroll, { passive: false });

    const background = document.querySelector('.background');
    const images = [
        '../assets/images/backgrounds/circle-specs.png',
        '../assets/images/backgrounds/circle-specs2.png',
        '../assets/images/backgrounds/circle-specs3.png',
    ];

    const scrollThreshold = 1500;
    const scrollChange = 100;
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.scrollY;

        if (Math.abs(currentScrollPosition - lastScrollPosition) >= scrollChange) {
            const currentIndexShift = currentScrollPosition > scrollThreshold ? 1 : -1;
            currentIndex = (currentIndex + currentIndexShift + images.length) % images.length;
            scrollingTextElements.forEach(textElement => {
                textElement.style.fontFamily = fonts[currentIndex];
            });
            background.style.background = `url(${images[currentIndex]}), var(--offwhite)`;
            lastScrollPosition = currentScrollPosition;
        }
    });

    var swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
});
