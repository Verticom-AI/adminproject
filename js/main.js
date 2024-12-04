document.addEventListener("DOMContentLoaded", () => {
    // انتخاب عناصر موردنیاز
    const nextButton = document.getElementById("next-button");
    const emailInput = document.getElementById("email");
    const passwordStep = document.getElementById("password-step");
    const form = document.getElementById("login-form");

    // رویداد کلیک برای دکمه "بعدی"
    nextButton.addEventListener("click", () => {
        const emailValue = emailInput.value.trim();

        // بررسی فرمت ایمیل
        if (!isValidEmail(emailValue)) {
            showError("لطفاً یک ایمیل معتبر وارد کنید.");
            return;
        }

        // نمایش فیلد رمز عبور
        showPasswordStep();
    });

    // بررسی ایمیل معتبر
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // نمایش مرحله رمز عبور
    function showPasswordStep() {
        // مخفی کردن دکمه "بعدی"
        nextButton.classList.add("hidden");

        // نمایش فیلد رمز عبور با انیمیشن
        passwordStep.style.display = "block";
        passwordStep.classList.add("fade-in");
    }

    // نمایش پیام خطا
    function showError(message) {
        // اگر پیام خطا قبلاً وجود دارد، حذف شود
        let errorMessage = document.querySelector(".error-message");
        if (!errorMessage) {
            // ایجاد عنصر پیام خطا
            errorMessage = document.createElement("div");
            errorMessage.className = "error-message text-danger small mt-2";
            emailInput.parentElement.appendChild(errorMessage);
        }
        errorMessage.textContent = message;

        // برجسته کردن فیلد نامعتبر
        emailInput.classList.add("is-invalid");
    }

    // حذف پیام خطا هنگام فوکوس مجدد
    emailInput.addEventListener("focus", () => {
        emailInput.classList.remove("is-invalid");
        const errorMessage = document.querySelector(".error-message");
        if (errorMessage) errorMessage.remove();
    });

    // ارسال فرم (تأیید نهایی)
    form.addEventListener("submit", (event) => {
        const emailValue = emailInput.value.trim();
        const passwordValue = document.getElementById("password").value.trim();

        if (!isValidEmail(emailValue)) {
            event.preventDefault();
            showError("لطفاً یک ایمیل معتبر وارد کنید.");
            return;
        }

        if (!passwordValue) {
            event.preventDefault();
            alert("لطفاً رمز عبور خود را وارد کنید.");
        }
    });
});
