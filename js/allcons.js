document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("name").value = user.name || "";
        document.getElementById("phone").value = user.phone || "";
    }
});
