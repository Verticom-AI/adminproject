document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");

    const cartIcon = document.getElementById("cart-icon");
    const cartDropdown = document.getElementById("cart-dropdown");

    let isProfileHovered = false; // وضعیت برای منوی پروفایل
    let isCartHovered = false;    // وضعیت برای منوی سبد خرید

    // باز کردن منوی پروفایل
    profileIcon.addEventListener("mouseenter", () => {
        profileDropdown.classList.add("active");
    });

    // بستن منوی پروفایل وقتی ماوس از روی آیکون و منو خارج شود
    profileIcon.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!isProfileHovered) profileDropdown.classList.remove("active");
        }, 200); // تأخیر کوچک برای جلوگیری از بسته شدن هنگام حرکت به منو
    });

    profileDropdown.addEventListener("mouseenter", () => {
        isProfileHovered = true;
    });

    profileDropdown.addEventListener("mouseleave", () => {
        isProfileHovered = false;
        profileDropdown.classList.remove("active");
    });

    // باز کردن منوی سبد خرید
    cartIcon.addEventListener("mouseenter", () => {
        cartDropdown.classList.add("active");
    });

    // بستن منوی سبد خرید وقتی ماوس از روی آیکون و منو خارج شود
    cartIcon.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!isCartHovered) cartDropdown.classList.remove("active");
        }, 200); // تأخیر کوچک برای جلوگیری از بسته شدن هنگام حرکت به منو
    });

    cartDropdown.addEventListener("mouseenter", () => {
        isCartHovered = true;
    });

    cartDropdown.addEventListener("mouseleave", () => {
        isCartHovered = false;
        cartDropdown.classList.remove("active");
    });
});
