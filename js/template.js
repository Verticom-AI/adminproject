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


// افزودن رویداد برای دکمه‌های افزودن به سبد خرید


// بارگذاری داده‌ها در هنگام باز شدن صفحه
document.addEventListener("DOMContentLoaded", updateCartDisplay);

// جستجوی داده‌های سایت
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// شبیه‌سازی داده‌های سایت


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












    // افزودن محصول به نسخه

    document.addEventListener("DOMContentLoaded", () => {
        const products = [
            { id: 1, name: "چای سبز" },
            { id: 2, name: "دمنوش نعناع" },
            { id: 3, name: "عسل طبیعی" },
        ];
    
        const productSearch = document.getElementById("product-search");
        const productList = document.getElementById("product-list");
        const prescriptionTable = document.getElementById("prescription-table");
    
        // جستجوی محصولات
        productSearch.addEventListener("input", () => {
            const query = productSearch.value.toLowerCase().trim();
            productList.innerHTML = ""; // پاک کردن نتایج قبلی
            const filteredProducts = products.filter((p) =>
                p.name.toLowerCase().includes(query)
            );
    
            if (filteredProducts.length > 0) {
                filteredProducts.forEach((product) => {
                    const productItem = document.createElement("div");
                    productItem.className =
                        "d-flex justify-content-between align-items-center product-item mb-2";
                    productItem.innerHTML = `<span>${product.name}</span>`;
                    productItem.addEventListener("click", () =>
                        addProductToPrescription(product)
                    );
                    productList.appendChild(productItem);
                });
            } else {
                productList.innerHTML = `<div class="text-center text-muted">محصولی یافت نشد</div>`;
            }
        });
    
        productSearch.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const query = productSearch.value.toLowerCase().trim();
                const firstProduct = products.find((p) =>
                    p.name.toLowerCase().includes(query)
                );
                if (firstProduct) {
                    addProductToPrescription(firstProduct);
                }
            }
        });
    
        // افزودن محصول به نسخه
        function addProductToPrescription(product) {
            const existingRow = prescriptionTable.querySelector(
                `tr[data-id="${product.id}"]`
            );
    
            if (existingRow) {
                const qtyInput = existingRow.querySelector("input");
                qtyInput.value = parseInt(qtyInput.value) + 1;
            } else {
                const row = document.createElement("tr");
                row.setAttribute("data-id", product.id);
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td><input type="number" class="form-control" value="1" min="1"></td>
                    <td><button class="btn btn-sm btn-danger remove-product">حذف</button></td>
                `;
                prescriptionTable.appendChild(row);
    
                row.querySelector(".remove-product").addEventListener("click", () =>
                    row.remove()
                );
            }
        }
    });
    
    
    
    
    class ChatManager {
    constructor() {
        this.chatBox = document.getElementById("chat-box");
        this.chatInput = document.getElementById("chat-input");
        this.actionButton = document.getElementById("action-button");
        this.chatListContainer = document.getElementById("chat-list-container");
        this.consultations = [
            { id: 1, user: "علی محمدی", messages: ["سلام", "مشکل من در مورد فیبروم هست"] },
            { id: 2, user: "سارا احمدی", messages: ["سلام", "ریزش مو دارم و دنبال راه‌حل هستم"] },
        ];
    
    
        this.activeChat = null;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.init();
    }
    
    init() {
        this.renderChatList();
        this.bindEvents();
    }
    
    renderChatList() {
        this.consultations.forEach((consultation) => {
            const chatItem = document.createElement("div");
            chatItem.className = "chat-item";
            chatItem.textContent = consultation.user;
            chatItem.addEventListener("click", () => {
                this.openChat(consultation);
                this.closeSlideBar();
            });
            this.chatListContainer.appendChild(chatItem);
        });
    }
    
    openChat(consultation) {
        this.activeChat = consultation;
        this.chatBox.innerHTML = "";
        consultation.messages.forEach((message) => this.addMessage(message, "user"));
    }
    
    addMessage(content, sender = "admin", isAudio = false) {
        const messageElement = document.createElement("div");
        messageElement.className = `chat-message ${sender}`;
        if (isAudio) {
            const audioElement = document.createElement("audio");
            audioElement.src = content;
            audioElement.controls = true;
            messageElement.appendChild(audioElement);
        } else {
            messageElement.textContent = content;
        }
    
        if (sender === "admin") {
            messageElement.addEventListener("click", () => {
                if (confirm("پیام را حذف کنید؟")) messageElement.remove();
            });
        }
    
        this.chatBox.appendChild(messageElement);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }
    
        // مدیریت اسلاید بار مشاوره‌ها (در صورت لزوم)
    
    
    
    
    bindEvents() {
        const overlay = document.getElementById("overlay");
        const slideBar = document.getElementById("slide-bar");
        const toggleChatList = document.getElementById("toggle-chat-list");
        const consultationBtn = document.getElementById("consultation-btn");
    
    consultationBtn.addEventListener("click", () => {
        slideBar.classList.toggle("open");
        overlay.classList.toggle("open");
            // بستن منو و پروفایل هنگام باز شدن مشاوره‌ها
            if (menu.classList.contains("open")) {
                menu.classList.remove("open");
            }
            if (profilePanel._element.classList.contains("open")) {
                profilePanel.classList.remove("open");
                overlay.classList.remove("open");
    
                profilePanel.hide();
            }
          });
    
        toggleChatList.addEventListener("click", () => {
            slideBar.classList.toggle("open");
            overlay.classList.toggle("open");
        });
    
        overlay.addEventListener("click", () => {
            slideBar.classList.remove("open");
            profilePanel.hide();
    
            overlay.classList.remove("open");
        });
    
        this.chatInput.addEventListener("input", () => {
            this.actionButton.textContent = this.chatInput.value.trim() ? "^" : "🎙️";
        });
    
        this.chatInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.sendMessage();
            }
        });
    
        this.actionButton.addEventListener("mousedown", () => this.startRecording());
        this.actionButton.addEventListener("mouseup", () => this.stopRecording());
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message) {
            this.addMessage(message, "admin");
            this.chatInput.value = "";
            this.actionButton.textContent = "🎙️";
        }
    }
    
    startRecording() {
        this.actionButton.classList.add("recording");
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();
            this.audioChunks = [];
            this.mediaRecorder.addEventListener("dataavailable", (event) => {
                this.audioChunks.push(event.data);
            });
            this.isRecording = true;
        });
    }
    
    stopRecording() {
        if (this.isRecording) {
            this.mediaRecorder.stop();
            this.mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(this.audioChunks, { type: "audio/mp3" });
                const audioUrl = URL.createObjectURL(audioBlob);
                this.addMessage(audioUrl, "admin", true);
            });
            this.actionButton.classList.remove("recording");
            this.isRecording = false;
        }
    }
    
    closeSlideBar() {
        const slideBar = document.getElementById("slide-bar");
        const overlay = document.getElementById("overlay");
        slideBar.classList.remove("open");
        overlay.classList.remove("open");
    }
    }
    
    new ChatManager();
    
    
    
    
    