/* ==========================================================================
   The Bouquets Vibe - Master JavaScript App Logic
   Location: Shankarnag Road, Bayasabhi Layout, KSRTC Colony, Anekal, Karnataka
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Catalog Product Data --- */
    const productsData = [
        {
            id: 'tbv-01',
            title: 'Royal Velvet Fresh Red Roses',
            category: 'real',
            tags: ['real', 'birthday', 'romance'],
            price: 899,
            rating: 5.0,
            badge: 'Fresh Real Flowers',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
            description: '12 premium fresh long-stemmed red roses hand-tied in luxury blush paper with satin ribbon. 100% natural morning harvest.',
            flowers: ['Fresh Red Roses', 'Gypsophila', 'Eucalyptus Leaves']
        },
        {
            id: 'tbv-mala-01',
            title: 'Royal Wedding Jaimala Pair (Fresh Floral Malas)',
            category: 'malas',
            tags: ['malas', 'real', 'wedding'],
            price: 2999,
            rating: 5.0,
            badge: 'Fresh Floral Mala',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
            description: 'Intricately woven pair of fresh wedding garlands (Jaimalas) made with fresh red rose petals, jasmine (Mullai), and gold tissue highlights.',
            flowers: ['Fresh Rose Petals', 'Jasmine (Mallige)', 'Golden Tissue Ribbon']
        },
        {
            id: 'tbv-art-01',
            title: 'Everlasting Silk Peony & Rose Bouquet',
            category: 'artificial',
            tags: ['artificial', 'birthday'],
            price: 1199,
            rating: 4.9,
            badge: 'Artificial / Silk',
            image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600',
            description: 'High-grade artificial silk peonies and velvet roses that stay pristine forever. Includes anti-dust finish and eco wrap.',
            flowers: ['Silk Peonies', 'Velvet Artificial Roses', 'Preserved Eucalyptus']
        },
        {
            id: 'tbv-02',
            title: 'Blush Lily & Fresh Rose Elegance',
            category: 'real',
            tags: ['real', 'wedding', 'birthday'],
            price: 1299,
            rating: 4.9,
            badge: 'Fresh Real Flowers',
            image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
            description: 'A romantic blend of pink oriental lilies, fresh pastel roses, and baby breath. Perfect for weddings and anniversaries.',
            flowers: ['Pink Oriental Lilies', 'Blush Roses', 'Baby Breath']
        },
        {
            id: 'tbv-mala-02',
            title: 'Fresh Jasmine & Lotus Engagement Mala',
            category: 'malas',
            tags: ['malas', 'real', 'wedding'],
            price: 1899,
            rating: 4.9,
            badge: 'Engagement Mala',
            image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=600',
            description: 'Handcrafted engagement garland featuring fresh pink lotus buds, fragrant white jasmine, and carnation drops.',
            flowers: ['Pink Lotus Buds', 'Fragrant Jasmine', 'Pink Carnations']
        },
        {
            id: 'tbv-art-02',
            title: 'Velvet Artificial Rose Hatbox (Everlasting)',
            category: 'artificial',
            tags: ['artificial', 'corporate'],
            price: 1599,
            rating: 4.8,
            badge: 'Everlasting Gift',
            image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
            description: 'Premium handcrafted artificial velvet red roses set inside a black luxury hatbox. Requires zero maintenance.',
            flowers: ['Velvet Artificial Roses', 'Gold Accent Leafage']
        },
        {
            id: 'tbv-03',
            title: 'Sunshine Sunflower & Gerbera Mix',
            category: 'real',
            tags: ['real', 'birthday'],
            price: 749,
            rating: 4.8,
            badge: 'Popular Real',
            image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600',
            description: 'Vibrant real yellow sunflowers paired with orange gerberas and solidago. Brightens any birthday celebration.',
            flowers: ['Sunflowers', 'Orange Gerberas', 'Solidago']
        },
        {
            id: 'tbv-decor-01',
            title: 'Grand Anekal Wedding Stage & Mandap Floral Decor',
            category: 'wedding',
            tags: ['wedding', 'real', 'malas'],
            price: 15999,
            rating: 5.0,
            badge: 'Wedding Package',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
            description: 'Complete floral decoration for wedding stage, entrance arch, mandap, and car decor using fresh real flowers & decorative garlands.',
            flowers: ['Marigolds', 'Roses', 'Orchids', 'Jasmine']
        }
    ];

    /* --- Cart State (localStorage backed) --- */
    let cart = JSON.parse(localStorage.getItem('tbv_cart')) || [];

    /* --- DOM Elements --- */
    const productsGrid = document.getElementById('productsGrid');
    const categoryTabs = document.getElementById('categoryTabs');
    const productSearchInput = document.getElementById('productSearchInput');
    const sortSelect = document.getElementById('sortSelect');
    const cartBtn = document.getElementById('cartBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartState = document.getElementById('emptyCartState');
    const cartDrawerFooter = document.getElementById('cartDrawerFooter');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const globalSearchInput = document.getElementById('globalSearchInput');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    /* --- Render Products Catalog --- */
    function renderProducts(productsToRender) {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';

        if (productsToRender.length === 0) {
            productsGrid.innerHTML = `
                <div class="col-span-full text-center py-5">
                    <i class="fa-solid fa-leaf text-muted" style="font-size: 3rem;"></i>
                    <p class="mt-3 text-muted">No floral arrangements found matching your criteria.</p>
                </div>
            `;
            return;
        }

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-box">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <span class="badge-tag">${product.badge}</span>
                    <button class="quick-view-btn" data-id="${product.id}" title="Quick View">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
                <div class="product-content">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-bottom">
                        <span class="product-price">₹${product.price}</span>
                        <button class="add-cart-btn" data-id="${product.id}">
                            <i class="fa-solid fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        // Attach Quick View events
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                openProductModal(id);
            });
        });

        // Attach Add to Cart events
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                addToCart(id);
            });
        });
    }

    /* --- Filter & Sort Logic --- */
    let currentCategory = 'all';
    let currentSearch = '';
    let currentSort = 'featured';

    function filterAndSortProducts() {
        let filtered = [...productsData];

        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === currentCategory || (p.tags && p.tags.includes(currentCategory)));
        }

        if (currentSearch.trim() !== '') {
            const query = currentSearch.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.flowers.some(f => f.toLowerCase().includes(query))
            );
        }

        if (currentSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'popular') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        renderProducts(filtered);
    }

    if (categoryTabs) {
        categoryTabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;

            categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            filterAndSortProducts();
        });
    }

    if (productSearchInput) {
        productSearchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            filterAndSortProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterAndSortProducts();
        });
    }

    /* --- Quick View Product Modal --- */
    const productModal = document.getElementById('productModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBody = document.getElementById('modalBody');

    function openProductModal(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product || !productModal) return;

        modalBody.innerHTML = `
            <div class="product-modal-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="modal-img-box" style="border-radius: 12px; overflow: hidden; height: 320px;">
                    <img src="${product.image}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="modal-info">
                    <span class="sub-heading" style="color: var(--secondary-color); font-size: 0.8rem;">${product.category.toUpperCase()}</span>
                    <h2 class="font-serif" style="font-size: 1.8rem; margin: 0.25rem 0 0.5rem;">${product.title}</h2>
                    <div style="color: #ffb800; font-size: 0.9rem; margin-bottom: 0.75rem;">
                        <i class="fa-solid fa-star"></i> ${product.rating} / 5.0 (Freshness Verified)
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">${product.description}</p>
                    
                    <div style="margin-bottom: 1.25rem;">
                        <strong style="display:block; font-size: 0.85rem; margin-bottom: 0.4rem;">Flowers Included:</strong>
                        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                            ${product.flowers.map(f => `<span style="background:var(--bg-body); border:1px solid var(--border-color); font-size: 0.78rem; padding: 0.2rem 0.6rem; border-radius: 20px;">🌸 ${f}</span>`).join('')}
                        </div>
                    </div>

                    <div style="font-size: 2rem; font-weight:700; color: var(--primary-color); font-family: var(--font-heading); margin-bottom: 1.5rem;">
                        ₹${product.price} <small style="font-size: 0.8rem; color: var(--secondary-color); font-weight: 500;">(Free Anekal Delivery)</small>
                    </div>

                    <button class="btn btn-primary btn-block" id="modalAddToCartBtn">
                        <i class="fa-solid fa-cart-plus"></i> Add To Basket Now
                    </button>
                </div>
            </div>
        `;

        productModal.classList.add('active');

        document.getElementById('modalAddToCartBtn').addEventListener('click', () => {
            addToCart(product.id);
            productModal.classList.remove('active');
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    }

    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) productModal.classList.remove('active');
        });
    }

    /* --- Interactive Custom Bouquet Builder Logic --- */
    const flowerBaseOptions = document.getElementById('flowerBaseOptions');
    const styleOptionsGrid = document.querySelector('.style-options-grid');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    const customCardNote = document.getElementById('customCardNote');

    const summaryBase = document.getElementById('summaryBase');
    const summarySize = document.getElementById('summarySize');
    const summaryWrap = document.getElementById('summaryWrap');
    const summaryAddons = document.getElementById('summaryAddons');
    const summaryNote = document.getElementById('summaryNote');
    const builderTotalPrice = document.getElementById('builderTotalPrice');
    const builderPreviewImg = document.getElementById('builderPreviewImg');
    const addCustomToCartBtn = document.getElementById('addCustomToCartBtn');
    const orderCustomWhatsAppBtn = document.getElementById('orderCustomWhatsAppBtn');

    function updateCustomBuilderSummary() {
        if (!builderTotalPrice) return;

        // Base flower
        const selectedBase = document.querySelector('input[name="baseFlower"]:checked');
        const basePrice = selectedBase ? parseInt(selectedBase.getAttribute('data-price')) : 499;
        const baseName = selectedBase ? selectedBase.value : 'Red Roses';

        // Size
        const selectedSize = document.querySelector('input[name="bouquetSize"]:checked');
        const sizeMultiplier = selectedSize ? parseFloat(selectedSize.getAttribute('data-multiplier')) : 1;
        const sizeName = selectedSize ? selectedSize.value.split(' (')[0] : 'Standard Hand-tied';

        // Wrap Color
        const selectedWrap = document.querySelector('input[name="wrapColor"]:checked');
        const wrapName = selectedWrap ? selectedWrap.value : 'Blush Pink';

        // Addons
        let addonsPrice = 0;
        let selectedAddonNames = [];
        addonCheckboxes.forEach(cb => {
            if (cb.checked) {
                addonsPrice += parseInt(cb.getAttribute('data-price'));
                selectedAddonNames.push(cb.value.split(' (')[0]);
            }
        });

        // Note
        const noteText = customCardNote ? customCardNote.value.trim() : '';

        // Calculate Total
        const total = Math.round((basePrice * sizeMultiplier) + addonsPrice);

        // Update UI
        if (summaryBase) summaryBase.textContent = baseName;
        if (summarySize) summarySize.textContent = sizeName;
        if (summaryWrap) summaryWrap.textContent = wrapName;
        if (summaryAddons) summaryAddons.textContent = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None';
        if (summaryNote) summaryNote.textContent = noteText ? `"${noteText}"` : 'No note specified';
        if (builderTotalPrice) builderTotalPrice.textContent = `₹${total}`;

        // Update Image Preview according to flower type
        if (builderPreviewImg) {
            if (baseName.includes('Lilies')) {
                builderPreviewImg.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=500';
            } else if (baseName.includes('Orchids')) {
                builderPreviewImg.src = 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=500';
            } else if (baseName.includes('Sunflowers')) {
                builderPreviewImg.src = 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=500';
            } else {
                builderPreviewImg.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=500';
            }
        }
    }

    // Attach events for builder controls
    if (flowerBaseOptions) {
        flowerBaseOptions.addEventListener('change', (e) => {
            document.querySelectorAll('#flowerBaseOptions .option-card').forEach(c => c.classList.remove('active'));
            e.target.closest('.option-card').classList.add('active');
            updateCustomBuilderSummary();
        });
    }

    if (styleOptionsGrid) {
        styleOptionsGrid.addEventListener('change', (e) => {
            document.querySelectorAll('.style-card').forEach(c => c.classList.remove('active'));
            e.target.closest('.style-card').classList.add('active');
            updateCustomBuilderSummary();
        });
    }

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            swatch.querySelector('input').checked = true;
            updateCustomBuilderSummary();
        });
    });

    addonCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateCustomBuilderSummary);
    });

    if (customCardNote) {
        customCardNote.addEventListener('input', updateCustomBuilderSummary);
    }

    if (addCustomToCartBtn) {
        addCustomToCartBtn.addEventListener('click', () => {
            const baseName = document.querySelector('input[name="baseFlower"]:checked')?.value || 'Red Roses';
            const sizeName = document.querySelector('input[name="bouquetSize"]:checked')?.value || 'Standard';
            const wrapName = document.querySelector('input[name="wrapColor"]:checked')?.value || 'Blush Pink';
            const priceText = builderTotalPrice.textContent.replace('₹', '');
            const noteText = customCardNote ? customCardNote.value.trim() : '';

            const customProduct = {
                id: 'custom-' + Date.now(),
                title: `Custom ${baseName} Bouquet`,
                price: parseInt(priceText),
                image: builderPreviewImg ? builderPreviewImg.src : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300',
                details: `${sizeName} | Wrap: ${wrapName}${noteText ? ` | Note: "${noteText}"` : ''}`,
                quantity: 1
            };

            cart.push(customProduct);
            saveAndUpdateCart();
            openCartDrawer();
        });
    }

    if (orderCustomWhatsAppBtn) {
        orderCustomWhatsAppBtn.addEventListener('click', () => {
            const baseName = document.querySelector('input[name="baseFlower"]:checked')?.value || 'Red Roses';
            const sizeName = document.querySelector('input[name="bouquetSize"]:checked')?.value || 'Standard';
            const wrapName = document.querySelector('input[name="wrapColor"]:checked')?.value || 'Blush Pink';
            const priceText = builderTotalPrice.textContent;
            const noteText = customCardNote ? customCardNote.value.trim() : '';

            const msg = `Hello The Bouquets Vibe (Anekal)!\nI want to place a *Custom Bouquet Order*:\n- Base Flowers: ${baseName}\n- Style/Size: ${sizeName}\n- Wrapping: ${wrapName}\n- Card Note: ${noteText || 'None'}\n- Total Price: ${priceText}\n\nPlease confirm availability and delivery slot!`;
            
            window.open(`https://wa.me/919845012345?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    /* --- Cart Drawer Logic --- */
    function saveAndUpdateCart() {
        localStorage.setItem('tbv_cart', JSON.stringify(cart));
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (cartBadge) cartBadge.textContent = totalItems;
        renderCartItems();
    }

    function addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        const existingIndex = cart.findIndex(item => item.id === productId);
        if (existingIndex > -1) {
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        saveAndUpdateCart();
        openCartDrawer();
    }

    function renderCartItems() {
        if (!cartItemsList) return;
        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            if (emptyCartState) emptyCartState.style.display = 'block';
            if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
            return;
        }

        if (emptyCartState) emptyCartState.style.display = 'none';
        if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';

        let subtotal = 0;

        cart.forEach((item, index) => {
            const qty = item.quantity || 1;
            const itemTotal = item.price * qty;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    ${item.details ? `<div style="font-size:0.75rem; color:var(--text-muted);">${item.details}</div>` : ''}
                    <div class="cart-item-price">₹${item.price} x ${qty} = ₹${itemTotal}</div>
                    <div class="cart-item-qty-row">
                        <button class="qty-btn dec-btn" data-index="${index}">-</button>
                        <span>${qty}</span>
                        <button class="qty-btn inc-btn" data-index="${index}">+</button>
                        <button class="remove-item-btn" data-index="${index}"><i class="fa-solid fa-trash"></i> Remove</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(div);
        });

        if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal}`;
        if (cartTotal) cartTotal.textContent = `₹${subtotal}`;

        // Quantity & remove event listeners
        document.querySelectorAll('.dec-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                } else {
                    cart.splice(idx, 1);
                }
                saveAndUpdateCart();
            });
        });

        document.querySelectorAll('.inc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                cart[idx].quantity = (cart[idx].quantity || 1) + 1;
                saveAndUpdateCart();
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                cart.splice(idx, 1);
                saveAndUpdateCart();
            });
        });
    }

    function openCartDrawer() {
        if (cartDrawer) cartDrawer.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
    }

    function closeCartDrawer() {
        if (cartDrawer) cartDrawer.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    }

    if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    /* --- WhatsApp Checkout Button --- */
    const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');
    if (whatsappCheckoutBtn) {
        whatsappCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            let text = `Hello The Bouquets Vibe (Shankarnag Rd, Anekal)!\nI would like to order the following cart items:\n\n`;
            let grandTotal = 0;

            cart.forEach((item, i) => {
                const qty = item.quantity || 1;
                const price = item.price * qty;
                grandTotal += price;
                text += `${i + 1}. *${item.title}* (Qty: ${qty}) - ₹${price}\n`;
                if (item.details) text += `   Note: ${item.details}\n`;
            });

            text += `\n*Total Amount:* ₹${grandTotal}\nDelivery Location: Anekal\n\nPlease send payment link or confirm COD!`;

            window.open(`https://wa.me/919845012345?text=${encodeURIComponent(text)}`, '_blank');
        });
    }

    /* --- Checkout Modal Logic --- */
    const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutSuccessMessage = document.getElementById('checkoutSuccessMessage');
    const chkFinalTotal = document.getElementById('chkFinalTotal');
    const sendOrderToWhatsAppBtn = document.getElementById('sendOrderToWhatsAppBtn');
    let lastOrderDetails = null;

    if (proceedCheckoutBtn) {
        proceedCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            closeCartDrawer();
            const totalSum = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            if (chkFinalTotal) chkFinalTotal.textContent = `₹${totalSum}`;
            
            if (checkoutForm) checkoutForm.classList.remove('hidden');
            if (checkoutSuccessMessage) checkoutSuccessMessage.classList.add('hidden');
            if (checkoutModal) checkoutModal.classList.add('active');
        });
    }

    if (checkoutCloseBtn) {
        checkoutCloseBtn.addEventListener('click', () => {
            if (checkoutModal) checkoutModal.classList.remove('active');
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const orderId = 'TBV-' + Math.floor(10000 + Math.random() * 90000);
            const name = document.getElementById('chkName').value;
            const phone = document.getElementById('chkPhone').value;
            const address = document.getElementById('chkAddress').value;
            const date = document.getElementById('chkDate').value;
            const slot = document.getElementById('chkSlot').value;
            const payment = document.getElementById('chkPayment').value;
            const totalSum = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

            lastOrderDetails = {
                orderId, name, phone, address, date, slot, payment, totalSum, items: [...cart]
            };

            // Reset cart
            cart = [];
            saveAndUpdateCart();

            // Display Success State
            checkoutForm.classList.add('hidden');
            if (document.getElementById('orderIdBadge')) {
                document.getElementById('orderIdBadge').textContent = `Order #${orderId}`;
            }
            if (checkoutSuccessMessage) checkoutSuccessMessage.classList.remove('hidden');
        });
    }

    if (sendOrderToWhatsAppBtn) {
        sendOrderToWhatsAppBtn.addEventListener('click', () => {
            if (!lastOrderDetails) return;

            let msg = `Hello The Bouquets Vibe!\nI just placed Order *#${lastOrderDetails.orderId}* on your website:\n\n`;
            msg += `*Customer:* ${lastOrderDetails.name}\n`;
            msg += `*Phone:* ${lastOrderDetails.phone}\n`;
            msg += `*Delivery Address:* ${lastOrderDetails.address}\n`;
            msg += `*Delivery Date:* ${lastOrderDetails.date} (${lastOrderDetails.slot})\n`;
            msg += `*Payment Method:* ${lastOrderDetails.payment}\n\n`;
            msg += `*Ordered Items:*\n`;

            lastOrderDetails.items.forEach((item, i) => {
                msg += `${i + 1}. ${item.title} (x${item.quantity || 1}) - ₹${item.price * (item.quantity || 1)}\n`;
            });

            msg += `\n*Total Order Amount:* ₹${lastOrderDetails.totalSum}`;

            window.open(`https://wa.me/919845012345?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    /* --- Global Search Bar --- */
    if (searchToggleBtn && searchOverlay) {
        searchToggleBtn.addEventListener('click', () => {
            searchOverlay.classList.toggle('active');
            if (searchOverlay.classList.contains('active')) {
                globalSearchInput.focus();
            }
        });
    }

    if (closeSearchBtn && searchOverlay) {
        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }

    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
            filterAndSortProducts();
        });
    }

    /* --- Mobile Menu Drawer --- */
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- Event Consultation Form --- */
    const consultationForm = document.getElementById('consultationForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            consultationForm.style.display = 'none';
            if (formSuccessMessage) formSuccessMessage.classList.add('active');
        });
    }

    /* --- Gallery Filtering --- */
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* --- FAQ Accordion --- */
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    /* --- Add Review Form --- */
    const addReviewForm = document.getElementById('addReviewForm');
    const reviewsGrid = document.getElementById('reviewsGrid');

    if (addReviewForm && reviewsGrid) {
        addReviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('revName').value;
            const location = document.getElementById('revLocation').value;
            const stars = document.getElementById('revStars').value;
            const comment = document.getElementById('revComment').value;

            const starsHtml = '<i class="fa-solid fa-star"></i>'.repeat(parseInt(stars));
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-header">
                    <div class="user-avatar">${initials}</div>
                    <div>
                        <strong>${name}</strong>
                        <div class="review-meta"><i class="fa-solid fa-location-dot"></i> ${location}</div>
                    </div>
                </div>
                <div class="review-stars">${starsHtml}</div>
                <p class="review-text">"${comment}"</p>
            `;

            reviewsGrid.prepend(card);
            addReviewForm.reset();
            alert('Thank you! Your review has been published.');
        });
    }

    /* --- Leaflet Map Setup --- */
    function initMap() {
        const mapElement = document.getElementById('leafletMap');
        if (!mapElement) return;

        // Shankarnag Road, Bayasabhi Layout, KSRTC Colony, Anekal, Karnataka 562106
        const anekalLat = 12.7107;
        const anekalLng = 77.6974;

        const map = L.map('leafletMap').setView([anekalLat, anekalLng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom marker popup
        const marker = L.marker([anekalLat, anekalLng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
                <strong style="color: #8a2b53; font-size: 1.1rem;">The Bouquets Vibe</strong><br>
                <span>Shankarnag Road, Bayasabhi Layout</span><br>
                <span>KSRTC Colony, Anekal - 562106</span><br>
                <small style="color: #3d6350; font-weight: 600;">📞 +91 98450 12345</small>
            </div>
        `).openPopup();
    }

    /* --- Initial Execution --- */
    renderProducts(productsData);
    saveAndUpdateCart();
    updateCustomBuilderSummary();
    initMap();
});
