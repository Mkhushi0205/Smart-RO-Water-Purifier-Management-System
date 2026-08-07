document.addEventListener("DOMContentLoaded", () => {

    //welcome message

    const welcome = document.querySelector(".welcome h1");
    const hour = new Date().getHours();
    let greeting = "Welcome";
    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good evening";
    }

    if (welcome) {
        welcome.textContent = `${greeting}, Customer 👋`
    }

    //logout

    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const confirmLogout = confirm("Are you sure, you want to logout?");

            if (confirmLogout) {
                window.location.href = "/";
            }
        });
    }

    //dashboard cards animation

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });

    });

    //quick action buttons

    const actionButtons = document.querySelectorAll(".action-card button");
    actionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const action = button.parentElement.querySelector("h3").textContent;
            alert(action + " feature will be available soon. ");
        });

    });

    //hightlight sidebar menu 
    const menuitems = document.querySelectorAll(".sidebar a");

    menuitems.forEach(item => {
        item.addEventListener("click", function () {
            menuitems.forEach(link => link.classList.remove("active"));
            this.classList.add(" active ");
        });

    });

});