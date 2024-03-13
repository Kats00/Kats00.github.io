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
    const projects = document.querySelector('.projects');
    const images = [
        '../assets/images/backgrounds/specs1.png',
        '../assets/images/backgrounds/specs2.png',
        '../assets/images/backgrounds/specs3.png',
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
            projects.style.background = `url(${images[currentIndex]}), var(--offwhite)`;
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


      const canvasEl = document.querySelector('#background-canvas');
      const canvasCxt = canvasEl.getContext('2d');
      
      let params = {
          maxSize: 0,
          riseSpeed: .0003,
          scaleSpeed: .0003,
          curviness: 6,
          mouseThreshold: .05,
          mouseMagnet: 130,
          ballsNumber: 0
      };
      
      let mouse = {
          x: .5 * window.innerWidth,
          y: .1 * window.innerHeight
      };
      
      let screen;
      resizeCanvas();
      
      let bubblesData;
      initBubblesArray();
      
      document.onmousemove = function (e) {
          mouse.x = e.pageX;
          mouse.y = e.pageY;
      }
      document.ontouchmove = function (e) {
          mouse.x = e.targetTouches[0].pageX;
          mouse.y = e.targetTouches[0].pageY
      }
      
      window.onresize = function () {
          resizeCanvas();
          initBubblesArray();
      };
      
      updateCanvas();
      
      function initBubblesArray() {
          bubblesData = [];
          for (let i = 0; i < params.ballsNumber; i++) {
              const d = {
                  progress: Math.random(),
                  amplitudeX: 20 + 50 * Math.random(),
                  initX: screen.w * Math.random(),
                  size: (.2 + .8 * Math.random()) * params.maxSize
              }
              d.position = {
                  baseX: 0,
                  baseY: 0,
                  x: d.initX,
                  y: screen.h,
                  targetX: d.initX,
                  targetY: screen.h,
              };
              d.scale = 1 - d.progress;
              bubblesData[i] = d;
          }
      }
      
      function updateCanvas() {
        canvasCxt.clearRect(0, 0, screen.w, screen.h);
        bubblesData.forEach((b) => {
    
            b.progress -= params.riseSpeed;
    
           // calculate base trajectory (move upwards with little wave applied)
            b.position.baseX = b.initX + Math.sin(b.progress * params.curviness) * b.amplitudeX;

            // Update the baseY calculation to start from the bottom of the container and progress towards the top
            b.position.baseY = b.progress * screen.h;

            
            // mouse interaction
            const dX = mouse.x - b.position.targetX;
            const dY = mouse.y - b.position.targetY;
            const sqDist = Math.sqrt((dX * dX) + (dY * dY));
            b.position.targetX = b.position.baseX - params.mouseMagnet * dX / sqDist;
            b.position.targetY = b.position.baseY - params.mouseMagnet * dY / sqDist;
    
            // add delay to the cursor response
            b.position.x += (b.position.targetX - b.position.x) * params.mouseThreshold;
            b.position.y += (b.position.targetY - b.position.y) * params.mouseThreshold;
    
            // scale it up
            b.scale += params.scaleSpeed;
    
            // move bubble to the bottom of the screen instantly (without mouseThreshold)
            if (b.progress > .99) {
                b.position.y = b.position.targetY;
            }
    
            // burst the bubble
            if (b.progress <= 0) {
                b.scale = 0;
                b.progress = 1;
            }
    
            // draw the ball
            canvasCxt.beginPath();
            canvasCxt.arc(b.position.x, b.position.y, b.size * b.scale, 0, 2 * Math.PI);
            canvasCxt.stroke();
        });
        window.requestAnimationFrame(updateCanvas);
    }
    
      
      function resizeCanvas() {
          const parentContainerHeight = canvasEl.parentElement.offsetHeight;
          screen = {
              w: window.innerWidth,
              h: parentContainerHeight,
          };
          params.ballsNumber = 0.15 * screen.w;
          params.maxSize = 20;
          canvasEl.width = screen.w;
          canvasEl.height = screen.h;
      }
      
      
});
