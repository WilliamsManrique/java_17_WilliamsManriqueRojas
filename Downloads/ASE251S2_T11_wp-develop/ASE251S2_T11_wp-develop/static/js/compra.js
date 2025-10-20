// Base de datos de productos por categoría
        const productsByCategory = {
            fosfatados: [
                { id: 1, name: "Fosfato Diamónico", category: "FERTILIZANTES FOSFATADOS", price: 45.99 },
                { id: 2, name: "Superfosfato Triple", category: "FERTILIZANTES FOSFATADOS", price: 38.50 },
                { id: 3, name: "Fosfato Monoamónico Granular", category: "FERTILIZANTES FOSFATADOS", price: 52.75 },
                { id: 4, name: "MicroEssentials SZ", category: "FERTILIZANTES FOSFATADOS", price: 67.20 }
            ],
            magnesicos: [
                { id: 5, name: "K-Mag / Sulpomag", category: "FERTILIZANTES MAGNÉSICOS", price: 25.99 },
                { id: 6, name: "Kieserita", category: "FERTILIZANTES MAGNÉSICOS", price: 32.50 },
                { id: 7, name: "Sulfato de Magnesio", category: "FERTILIZANTES MAGNÉSICOS", price: 28.75 },
                { id: 8, name: "Óxido de Magnesio", category: "FERTILIZANTES MAGNÉSICOS", price: 42.30 }
            ],
            potasicos: [
                { id: 9, name: "Cloruro de Potasio", category: "FERTILIZANTES POTÁSICOS", price: 29.80 },
                { id: 10, name: "Sulfato de Potasio", category: "FERTILIZANTES POTÁSICOS", price: 55.40 }
            ],
            nitrogenados: [
                { id: 11, name: "Urea 46%", category: "FERTILIZANTES NITROGENADOS", price: 35.90 },
                { id: 12, name: "Nitrato de Amonio", category: "FERTILIZANTES NITROGENADOS", price: 48.60 }
            ],
            // Puedes agregar más categorías aquí
            inicio: [
                { id: 13, name: "Producto Inicio 1", category: "INICIO Y PREFLORACIÓN", price: 30.00 },
                { id: 14, name: "Producto Inicio 2", category: "INICIO Y PREFLORACIÓN", price: 35.00 }
            ],
            vegetativo: [
                { id: 15, name: "Producto Vegetativo 1", category: "DESARROLLO VEGETATIVO", price: 40.00 }
            ],
            // ... agregar más categorías según necesites
        };

        // Títulos de categorías
        const categoryTitles = {
            fosfatados: "FERTILIZANTES FOSFATADOS",
            magnesicos: "FERTILIZANTES MAGNÉSICOS",
            potasicos: "FERTILIZANTES POTÁSICOS",
            nitrogenados: "FERTILIZANTES NITROGENADOS",
            inicio: "INICIO Y PREFLORACIÓN",
            vegetativo: "DESARROLLO VEGETATIVO",
            multiproposito: "MULTIPROPÓSITO",
            fruto: "DESARROLLO Y LLENADO DE FRUTO",
            micronutrientes: "MICRONUTRIENTES",
            compuestos: "FERTILIZANTES COMPUESTOS",
            molinax: "MEZCLAS MOLINAX",
            especificas: "MEZCLAS ESPECÍFICAS",
            quimicas: "MEZCLAS QUÍMICAS Y FORMULACIONES",
            hidrosolubles: "FERTILIZANTES HIDROSOLUBLES",
            foliares: "FERTILIZANTES FOLIARES"
        };

        // Función para mostrar productos de una categoría
        function showCategory(category) {
            const productsGrid = document.getElementById('products-grid');
            const categoryTitle = document.getElementById('current-category-title');
            
            // Actualizar título
            categoryTitle.textContent = categoryTitles[category] || category.toUpperCase();
            
            // Obtener productos de la categoría
            const products = productsByCategory[category] || [];
            
            // Limpiar grid
            productsGrid.innerHTML = '';
            
            if (products.length === 0) {
                productsGrid.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
                return;
            }
            
            // Generar productos
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <button class="add-to-cart-btn" 
                            data-id="${product.id}" 
                            data-name="${product.name}" 
                            data-price="${product.price}">
                        AÑADIR AL CARRITO
                    </button>
                `;
                productsGrid.appendChild(productCard);
            });
            
            // Actualizar enlaces activos
            updateActiveLinks(category);
            
            // Re-asignar eventos a los botones de añadir al carrito
            reassignCartEvents();
        }

        // Función para actualizar enlaces activos
        function updateActiveLinks(activeCategory) {
            const links = document.querySelectorAll('.categories-list a');
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick')?.includes(activeCategory)) {
                    link.classList.add('active');
                }
            });
        }

        // Función para re-asignar eventos del carrito
        function reassignCartEvents() {
            const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const name = this.getAttribute('data-name');
                    const price = parseFloat(this.getAttribute('data-price'));
                    addToCart(id, name, price);
                });
            });
        }

        // Sistema del carrito
        document.addEventListener('DOMContentLoaded', function() {
            const cartIcon = document.getElementById('header-cart-icon');
            const cartSystem = document.getElementById('cart-system');
            const closeCart = document.getElementById('close-cart');
            const overlay = document.getElementById('overlay');
            const checkoutBtn = document.getElementById('checkout-btn');
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Mostrar categoría por defecto
            showCategory('fosfatados');
            
            // Actualizar contador del carrito
            function updateCartCount() {
                const cartCount = document.querySelector('.cart-count');
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
            
            // Abrir carrito
            cartIcon.addEventListener('click', function() {
                cartSystem.classList.add('open');
                overlay.classList.add('active');
                updateCartModal();
            });
            
            // Cerrar carrito
            closeCart.addEventListener('click', function() {
                cartSystem.classList.remove('open');
                overlay.classList.remove('active');
            });
            
            // Cerrar carrito al hacer clic en el overlay
            overlay.addEventListener('click', function() {
                cartSystem.classList.remove('open');
                overlay.classList.remove('active');
            });
            
            // Añadir productos al carrito
            window.addToCart = function(id, name, price) {
                // Verificar si el producto ya está en el carrito
                const existingItem = cart.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: id,
                        name: name,
                        price: price,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                
                // Mostrar mensaje de confirmación
                alert(`¡${name} añadido al carrito!`);
            };
            
            // Actualizar modal del carrito
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
                        <div>
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                        </div>
                        <button class="remove-item" data-index="${index}">Eliminar</button>
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
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Tu carrito está vacío. Añade algunos productos antes de proceder al pago.');
                } else {
                    window.location.href = "{{ url_for('formulario_compra') }}";
                }
            });
            
            // Inicializar contador del carrito
            updateCartCount();
        });