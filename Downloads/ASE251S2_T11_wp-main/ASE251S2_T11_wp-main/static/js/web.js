document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Configurar el evento para el botón "next"
    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        startAutoSlide();
    });
    
    // Configurar el evento para el botón "prev"
    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        startAutoSlide();
    });
    
    // Actualizar el slider
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Actualizar clases activas para animaciones
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Iniciar autoplay
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 8000);
    }
    
    // Detener autoplay
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Configurar eventos para indicadores
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = i;
            updateSlider();
            startAutoSlide();
        });
    });
    
    // Soporte para gestos táctiles
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', () => {
        handleSwipe();
        startAutoSlide();
    });
    
    // Soporte para ratón (drag)
    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        stopAutoSlide();
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
    
    function mouseMoveHandler(e) {
        endX = e.clientX;
    }
    
    function mouseUpHandler() {
        handleSwipe();
        startAutoSlide();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        const difference = startX - endX;
        
        if (Math.abs(difference) > minSwipeDistance) {
            if (difference > 0) {
                // Swipe izquierda - siguiente slide
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                // Swipe derecha - slide anterior
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            updateSlider();
        }
    }
    
    // Pausar autoplay al interactuar con el slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Inicializar slider
    updateSlider();
    startAutoSlide();
});

// JavaScript para el menú móvil
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
});




// Animación al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const whyChooseSection = document.getElementById('why-choose-section');
    const cards = document.querySelectorAll('.why-choose-card');
    
    function checkScroll() {
        const sectionPosition = whyChooseSection.getBoundingClientRect();
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition.top < screenPosition) {
            cards.forEach(card => {
                card.classList.add('animated');
            });
            
            // Remover el event listener después de activar las animaciones
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    // Verificar al cargar y al hacer scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar al cargar la página
});

// Efectos de hover adicionales
document.querySelectorAll('.why-choose-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
});




