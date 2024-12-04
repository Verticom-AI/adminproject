// گرفتن پنل‌ها و دکمه‌ها
const cartBtn = document.getElementById('cart-btn');
const profileBtn = document.getElementById('profile-btn');
const profilePanel = new bootstrap.Offcanvas(document.getElementById('profile'));
const cartPanel = new bootstrap.Offcanvas(document.getElementById('cart'));
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu'); // منو شناور

// متغیر برای مشخص کردن پنل باز شده
let currentPanel = null;

// برای باز کردن منو از پایین به بالا (آکاردئونی)
function toggleMenu() {
    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // بستن منو
    } else {
        menu.classList.add('open'); // باز کردن منو
        // بستن هر پنل دیگری که باز است
        if (currentPanel !== null) {
            if (currentPanel === 'cart') {
                cartPanel.hide();
            } else if (currentPanel === 'profile') {
                profilePanel.hide();
            }
            currentPanel = null;
        }
    }
}

// برای باز کردن پنل‌ها با دکمه‌ها
function openCartPanel() {
    if (currentPanel === 'cart') {
        cartPanel.hide();
        currentPanel = null;
    } else {
        profilePanel.hide();  // اگر پروفایل باز بود، آن را ببند
        cartPanel.show();
        currentPanel = 'cart';
        // بستن منو اگر باز باشد
        menu.classList.remove('open');
    }
}

function openProfilePanel() {
    if (currentPanel === 'profile') {
        profilePanel.hide();
        currentPanel = null;
    } else {
        cartPanel.hide();  // اگر سبد خرید باز بود، آن را ببند
        profilePanel.show();
        currentPanel = 'profile';
        // بستن منو اگر باز باشد
        menu.classList.remove('open');
    }
}

// باز کردن پنل‌ها با کلیک روی دکمه‌ها
cartBtn.addEventListener('click', openCartPanel);
profileBtn.addEventListener('click', openProfilePanel);
menuBtn.addEventListener('click', toggleMenu);

// بستن منو یا پنل‌ها هنگام کلیک خارج از آن‌ها
document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickInsideProfile = profilePanel._element.contains(event.target);
    const isClickInsideCart = cartPanel._element.contains(event.target);
    const isClickInsideBtn = event.target.classList.contains('floating-btn') || event.target.closest('.floating-btn');

    // اگر کلیک خارج از منو یا پنل‌ها باشد، منو یا پنل بسته شود
    if (!isClickInsideMenu && !isClickInsideProfile && !isClickInsideCart && !isClickInsideBtn) {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');  // بستن منو
        }
        if (currentPanel === 'cart') {
            cartPanel.hide();
        } else if (currentPanel === 'profile') {
            profilePanel.hide();
        }
        currentPanel = null;
    }
});

// جلوگیری از بسته شدن پنل هنگام کلیک روی دکمه‌های داخل پنل
document.querySelectorAll('.offcanvas').forEach(panel => {
    panel.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

// مدیریت سبد خرید با استفاده از Local Storage
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
        span.textContent = `${item.price} تومان`;

        li.appendChild(span);
        cartItemsList.appendChild(li);

        totalPrice += item.price;
    });

    totalPriceElement.textContent = `${totalPrice} تومان`;
}

function addToCart(item) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartDisplay();
}

// افزودن رویداد برای دکمه‌های افزودن به سبد خرید
document.querySelectorAll(".btn.btn-apple").forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = {
            name: `محصول ${index + 1}`,
            price: (index + 1) * 10000 // قیمت نمونه برای هر محصول
        };
        addToCart(product);
        alert(`${product.name} به سبد خرید افزوده شد!`);
    });
});

// بارگذاری داده‌ها در هنگام باز شدن صفحه
document.addEventListener("DOMContentLoaded", updateCartDisplay);

// جستجوی داده‌های سایت
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// شبیه‌سازی داده‌های سایت
const siteData = [
    { title: 'خانه', link: 'index.html' },
    { title: 'محصولات', link: 'products.html' },
    { title: 'تماس با ما', link: 'contact.html' },
    { title: 'مشاوره', link: 'admin-consultation.html' },
    { title: 'درباره ما', link: 'about.html' },
];

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query.length > 0) {
        const results = siteData.filter(item => item.title.toLowerCase().includes(query));
        results.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.title;
            li.addEventListener('click', () => {
                window.location.href = item.link; // باز کردن صفحه موردنظر
            });
            searchResults.appendChild(li);
        });
    }
});
