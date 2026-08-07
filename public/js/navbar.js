document.addEventListener("DOMContentLoaded", () => {

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        link.classList.remove("active");

        const linkPath = new URL(link.href).pathname;

        if(linkPath === currentPath) {
            link.classList.add("active");
        }
    });

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });
});