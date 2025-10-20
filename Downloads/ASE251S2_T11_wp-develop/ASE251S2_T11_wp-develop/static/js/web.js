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







// Manejo del dropdown en móviles del desplegable de productos
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Solo para móviles
    if (window.innerWidth <= 768) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });
    }
    
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownMenu.classList.remove('active');
        }
    });
});











 // Redirección a compraproducts.html con parámetro de categoría
        document.querySelectorAll('.view-products-btn').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                window.location.href = `compraproducts.html?category=${category}`;
            });
        });

        // Sistema básico del carrito (puedes mover esto a un archivo JS separado)
        document.addEventListener('DOMContentLoaded', function() {
            const cartIcon = document.getElementById('cart-icon');
            const cartModal = document.getElementById('cart-modal');
            const closeCart = document.getElementById('close-cart');
            const overlay = document.getElementById('overlay');
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            updateCartCount();

            // Abrir carrito
            cartIcon.addEventListener('click', function() {
                cartModal.style.display = 'block';
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
                updateCartModal();
            });
            
            // Cerrar carrito
            closeCart.addEventListener('click', function() {
                cartModal.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Cerrar carrito al hacer clic en el overlay
            overlay.addEventListener('click', function() {
                cartModal.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            function updateCartCount() {
                const cartCount = document.querySelector('.cart-count');
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }

            function updateCartModal() {
                const cartItems = document.getElementById('cart-items');
                const cartTotal = document.getElementById('cart-total');
                
                cartItems.innerHTML = '';
                let total = 0;

                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const cartItemElement = document.createElement('div');
                    cartItemElement.className = 'cart-item';
                    cartItemElement.innerHTML = `
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                            <button class="remove-item" data-index="${index}">Eliminar</button>
                        </div>
                    `;
                    cartItems.appendChild(cartItemElement);
                });

                cartTotal.textContent = total.toFixed(2);

                // Añadir eventos a los botones eliminar
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartModal();
                        updateCartCount();
                    });
                });
            }

            // Procesar compra
            document.getElementById('checkout-btn').addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Tu carrito está vacío. Añade algunos productos antes de proceder al pago.');
                } else {
                    window.location.href = 'formulario_compra.html';
                }
            });
        });