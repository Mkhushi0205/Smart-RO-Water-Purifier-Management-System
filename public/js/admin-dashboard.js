document.addEventListener("DOMContentLoaded", () => {

    //welcome message
    const welcomeTitle = document.querySelector(".welcome h1");

    const hour = new Date().getHours();
    let greeting = "Welcome";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    if (welcomeTitle) {
        welcomeTitle.textContent = `${greeting}, Admin 👋`;
    }

    //logout button
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(event) {
            event.preventDefault();

            const result = confirm("Are you sure, you want to logout?");

            if (result) {
                alert("Logged out successfully.");
                window.location.href = "/";
            }

        });

    }

    //sidebar active menu
    const menuLinks = document.querySelectorAll(".sidebar a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function() {
            menuLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });

    });

    //dashboard card click 
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function() {
            const title = card.querySelector("p").textContent;
            alert(title);
        });

    });

    //quick action button
    const actionButtons = document.querySelectorAll(".action-card button");

    actionButtons.forEach(button => {
        button.addEventListener("click", function() {
            const action = this.parentElement.querySelector("h3").textContent;

            switch(action) {
                case "+ Add Customer":
                    alert("Opening Add Customer page..");
                    break;
                
                case "💧 Add Product":
                    alert("Opening Add Product page..");
                    break;
                
                case "👨‍🔧 Assign Technician":
                    alert("Opening Technician Assignment..");
                    break;

                case "📊 Generate Report": 
                    alert("Generating Report..");
                    break;
            }
        });

    });

    //customer date
    const dateElement = document.getElementById("currentDate");

    if (dateElement) {
        const today = new Date();
        dateElement.textContent = today.toDateString();
    }

});