

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("form");
        const fileInput = document.getElementById("images");
        const errorMessage = document.getElementById("error-message");
    
        form.addEventListener("submit", function (event) {
            const files = fileInput.files;
            const maxFiles = 5;
            const maxTotalSize = 5 * 1024 * 1024; // 5 مگابایت
            let totalSize = 0;
    
            // بازنشانی پیام خطا
            errorMessage.classList.add("d-none");
            errorMessage.textContent = "";
    
            // بررسی تعداد فایل‌ها
            if (files.length > maxFiles) {
                errorMessage.textContent = "حداکثر می‌توانید 5 فایل ارسال کنید.";
                errorMessage.classList.remove("d-none");
                event.preventDefault();
                return;
            }
    
            // بررسی حجم فایل‌ها
            for (let i = 0; i < files.length; i++) {
                totalSize += files[i].size;
            }
    
            if (totalSize > maxTotalSize) {
                errorMessage.textContent = "حجم کل فایل‌ها نباید بیشتر از 5 مگابایت باشد.";
                errorMessage.classList.remove("d-none");
                event.preventDefault();
                return;
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        const fileInput = document.getElementById("images");
        const previewContainer = document.getElementById("preview-container");
        const errorMessage = document.getElementById("error-message");
    
        const maxFiles = 5; // حداکثر تعداد فایل‌ها
        const maxTotalSize = 5 * 1024 * 1024; // 5 مگابایت
    
        fileInput.addEventListener("change", function () {
            const files = Array.from(fileInput.files);
            let totalSize = 0;
    
            // پاک کردن پیش‌نمایش قبلی
            previewContainer.innerHTML = "";
            errorMessage.classList.add("d-none");
    
            // بررسی تعداد و حجم فایل‌ها
            if (files.length > maxFiles) {
                errorMessage.textContent = "حداکثر می‌توانید 5 فایل ارسال کنید.";
                errorMessage.classList.remove("d-none");
                fileInput.value = ""; // پاک کردن فایل‌ها
                return;
            }
    
            files.forEach(file => {
                totalSize += file.size;
            });
    
            if (totalSize > maxTotalSize) {
                errorMessage.textContent = "حجم کل فایل‌ها نباید بیشتر از 5 مگابایت باشد.";
                errorMessage.classList.remove("d-none");
                fileInput.value = ""; // پاک کردن فایل‌ها
                return;
            }
    
            // ایجاد پیش‌نمایش برای هر فایل
            files.forEach(file => {
                const reader = new FileReader();
    
                reader.onload = function (e) {
                    const previewItem = document.createElement("div");
                    previewItem.classList.add("preview-item");
    
                    const img = document.createElement("img");
                    img.src = e.target.result;
    
                    const removeButton = document.createElement("button");
                    removeButton.classList.add("remove-preview");
                    removeButton.innerHTML = "&times;";
                    removeButton.addEventListener("click", () => {
                        previewItem.remove();
                    });
    
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeButton);
                    previewContainer.appendChild(previewItem);
                };
    
                reader.readAsDataURL(file);
            });
        });
    });
    
    document.getElementById("special-consultation-button").addEventListener("click", () => {
        // فرض: چک کردن وضعیت ورود کاربر
        const isLoggedIn = checkUserLoggedIn(); // تابعی برای بررسی ورود کاربر
    
        if (isLoggedIn) {
            // کاربر وارد شده، انتقال به صفحه مشاوره تخصصی
            const consultationType = "فیبروم"; // نوع مشاوره (می‌توانید داینامیک کنید)
            redirectToConsultationPage(consultationType);
        } else {
            // کاربر وارد نشده، هدایت به صفحه ورود/ثبت‌نام
            redirectToLoginPage();
        }
    });
    
    // بررسی وضعیت ورود کاربر
    function checkUserLoggedIn() {
        // بررسی ساده: فرض کنید اطلاعات کاربر در Local Storage ذخیره شده است
        const userData = localStorage.getItem("user");
        return !!userData; // اگر کاربر وجود دارد، true برمی‌گرداند
    }
    
    // هدایت به صفحه مشاوره تخصصی
    function redirectToConsultationPage(consultationType) {
        const targetUrl = `special-consultation.html?type=${encodeURIComponent(consultationType)}`;
        window.location.href = targetUrl;
    }
    
    // هدایت به صفحه ورود/ثبت‌نام
    function redirectToLoginPage() {
        const currentUrl = window.location.href;
        const loginUrl = `login.html?redirect=${encodeURIComponent(currentUrl)}`;
        window.location.href = loginUrl;
    }
    