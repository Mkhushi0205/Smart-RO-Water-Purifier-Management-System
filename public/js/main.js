document.addEventListener("DOMContentLoaded", function() {

    // navbar
    const navLinks = document.querySelectorAll(".navbar ul li a");

    // highlighte the current page
    const currentPath = window.location.pathname;

    navLinks.forEach(function (link) {
        
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // service card animation
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("mouseenter", function() {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", function() {
            card.style.transform = "translateY(0)";
        });
    });

    // why us card animation
    const whyCards = document.querySelectorAll(".why-card");

    whyCards.forEach(function (card) {

        card.addEventListener("mouseenter", function() {
            card.style.transform = "translateY(-5px)";
        });

        card.addEventListener("mouseleave", function() {
            card.style.transform = "translateY(0)";
        });
    });


    // smooth scroll
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function(link) {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // hero image effect
    const heroImage = document.querySelector(".hero-imaage img");

    if (heroImage) {
        heroImage.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.03)";
        });

        heroImage.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    }


    // AI assistant button
    const aiButton = document.querySelector(".ai-btn");

    if (aiButton) {
        aiButton.addEventListener("click", function () {
            console.log("Opening M/S Shanti Enterprises AI Assistant...");
        });
    }


    // service button
    const serviceButtons = document.querySelectorAll('a[herf="/services"]');

    serviceButtons.forEach(function(button) {

        button.addEventListener("click", function () {
            console.log("Redirectting to RO Services page...");
        });
    });


    // contact button
    const contactButtons = document.querySelectorAll('a[href="/contact"]');

    contactButtons.forEach(function(button) {
        button.addEventListener("click", function () {
            console.log("Opening Contact page...");
        });
    });


    // login button
    const loginButton = document.querySelector('a[href="/login"]');

    if (loginButton) {
        loginButton.addEventListener("click", function () {
            console.log("Opening Login page...");
        });
    }


    // register button
    const registerButton = document.querySelector('a[href="/register"]');

    if (registerButton) {
        registerButton.addEventListener("click", function () {
            console.log("Opening Registration page...");
        });
    }


    // page load message
    console.log("M/S Shanti Enterprises Home Page Loaded Successfully.");
    
});