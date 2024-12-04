document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "چای سبز", price: 50000, image: "images/aa.jpg" },
        { id: 2, name: "دمنوش نعناع", price: 60000, image: "images/bb.jpg" },
        { id: 3, name: "عسل طبیعی", price: 150000, image: "images/cc.jpg" },
        { id: 4, name: "زیتون پرورده", price: 40000, image: "images/aa.jpg" },
    ];

    // بارگذاری سبد خرید از حافظه محلی (localStorage)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productContainer = document.getElementById("products");
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // اضافه کردن محصولات به صفحه
    products.forEach(product => {
        const productCard = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${product.image}" alt="${product.name}" class="card-img-top">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price.toLocaleString()} تومان</p>
                        <div class="cart-controls">
                            <button class="increase" data-id="${product.id}">+</button>
                            <span id="quantity-${product.id}">${getProductQuantity(product.id)}</span>
                            <button class="decrease" data-id="${product.id}">-</button>
                        </div>
                        <button class="btn btn-danger mt-3 add-to-cart" data-id="${product.id}">افزودن به سبد خرید</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.insertAdjacentHTML("beforeend", productCard);
    });

    // دکمه افزودن به سبد خرید
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);
            const existingProduct = cart.find(c => c.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateUI();
            saveCartToLocalStorage();
        });
    });

    // دکمه افزایش تعداد
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.dataset.id);
            const existingProduct = cart.find(c => c.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            }

            updateUI();
            saveCartToLocalStorage();
        });
    });

    // دکمه کاهش تعداد
    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.dataset.id);
            const existingProduct = cart.find(c => c.id === productId);

            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else {
                cart.splice(cart.indexOf(existingProduct), 1); // حذف محصول در صورت تعداد صفر
            }

            updateUI();
            saveCartToLocalStorage();
        });
    });

    // نمایش سبد خرید و قیمت کل
    function updateUI() {
        updateCartDisplay();
        updateTotalPrice();
    }

    // به‌روزرسانی نمایش سبد خرید
    function updateCartDisplay() {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const cartItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${item.name}</strong>
                        <div class="cart-controls">
                            <button class="decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <span>${(item.price * item.quantity).toLocaleString()} تومان</span>
                    <button class="btn btn-sm btn-danger remove" data-id="${item.id}">حذف</button>
                </li>
            `;
            cartItems.insertAdjacentHTML("beforeend", cartItem);
        });

        // حذف محصول از سبد خرید
        document.querySelectorAll("#cart-items .remove").forEach(button => {
            button.addEventListener("click", event => {
                const productId = parseInt(event.target.dataset.id);
                const existingProduct = cart.find(c => c.id === productId);

                if (existingProduct) {
                    cart.splice(cart.indexOf(existingProduct), 1);
                    updateUI();
                    saveCartToLocalStorage();
                }
            });
        });
    }

    // محاسبه و نمایش قیمت کل
    function updateTotalPrice() {
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} تومان`;
    }

    // دریافت تعداد محصول در سبد خرید
    function getProductQuantity(productId) {
        const existingProduct = cart.find(c => c.id === productId);
        return existingProduct ? existingProduct.quantity : 0;
    }

    // ذخیره سبد خرید در LocalStorage
    function saveCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // نمایش سبد خرید در اولین بار بارگذاری
    updateUI();
});
