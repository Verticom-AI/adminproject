// مدیریت سبد خرید با Local Storage

// به‌روزرسانی نمایش سبد خرید
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsList.innerHTML = "";
    let totalPrice = 0;

    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = item.name;

        const span = document.createElement("span");
        span.className = "badge bg-primary rounded-pill";
        span.textContent = `${item.price * item.quantity} تومان (${item.quantity} عدد)`;

        li.appendChild(span);
        cartItemsList.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${totalPrice} تومان`;
}

// افزودن آیتم به سبد خرید
function addToCart(item) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // بررسی اگر محصول از قبل در سبد خرید باشد
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cartItems.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartDisplay();
}

// مدیریت تعداد محصول در صفحه جزئیات
const quantityElement = document.getElementById("quantity");
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const addToCartBtn = document.getElementById("add-to-cart-btn");

// مدیریت تغییر تعداد محصول
let quantity = 1;

increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
});

decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
});

// افزودن محصول به سبد خرید با داده‌های صحیح
addToCartBtn.addEventListener("click", () => {
    const productName = document.querySelector("h2").textContent.trim();
    const productPrice = parseInt(document.querySelector(".text-success").textContent.replace(/,/g, '').replace("تومان", '').trim());
    const productQuantity = quantity;

    const product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
    };

    addToCart(product);
    alert(`${product.quantity} عدد از ${product.name} به سبد خرید اضافه شد.`);
});

// بارگذاری داده‌ها هنگام باز شدن صفحه
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
});

// مدیریت پنل‌ها و منوها
const cartBtn = document.getElementById('cart-btn');
const profileBtn = document.getElementById('profile-btn');
const profilePanel = new bootstrap.Offcanvas(document.getElementById('profile'));
const cartPanel = new bootstrap.Offcanvas(document.getElementById('cart'));
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
let currentPanel = null;

// باز کردن پنل‌ها
cartBtn.addEventListener('click', () => {
    if (currentPanel === 'cart') {
        cartPanel.hide();
        currentPanel = null;
    } else {
        profilePanel.hide();
        cartPanel.show();
        currentPanel = 'cart';
        menu.classList.remove('open');
    }
});

profileBtn.addEventListener('click', () => {
    if (currentPanel === 'profile') {
        profilePanel.hide();
        currentPanel = null;
    } else {
        cartPanel.hide();
        profilePanel.show();
        currentPanel = 'profile';
        menu.classList.remove('open');
    }
});

menuBtn.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    } else {
        menu.classList.add('open');
        if (currentPanel === 'cart') {
            cartPanel.hide();
        } else if (currentPanel === 'profile') {
            profilePanel.hide();
        }
        currentPanel = null;
    }
});
