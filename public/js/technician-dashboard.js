document.addEventListener("DOMContentLoaded", function() {

    //greeting message
    const welcomeTitle = document.querySelector(".welcome h1");

    if (welcomeTitle) {
        const hour = new Date().getHours();
        let greeting = "";

        if (hour < 12) {
            greeting = "Good Morning";
        } else if (hour < 17)  {
            greeting = " Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

        welcomeTitle.textContent = `${greeting}, Technician 👋`;
    } 

    //logout
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {

            e.preventDefault();

            const logout = confirm("Are you sure you want to logout?");

            if (logout) {
                alert("Logged out successfully!");
                window.location.href = "index.html";
            }
        });
    }

    //sidebar active menu
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach((link) => {

        link.addEventListener("click", function() {

            sidebarLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");
        });
    });

    //dashboard cards
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("click", function() {

            const title = this.querySelector("p").textContent;

            alert(title);
        });
    });

    //quick action button
    const buttons =  document.querySelectorAll(".action-card button");

    buttons.forEach(button => {

        button.addEventListener("click", function() {

            const action = this.parentElement.querySelector("h3").textContent;

            switch(action) {

                case "📋 View Jobs":
                    alert("Opening Assigned Jobs..");
                    break;

                case "🔧 Update Service":
                    alert("Opening Service Update..");
                    break;

                case "📸 Upload Photo":
                    alert("Opening Image Upload..");
                    break;

                case "☎ Contact Customer":
                    alert("Opening Contact Details..");
                    break;
            }
        });
    });

    //highlight today's pending jobs
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const status = row.cells[4].textContent.trim();
        if(status === "Pending") {
            row.style.background = "#fff8e1";
        }

        if(status === "Completed") {
            row.style.background = "#e8f5e9";
        }

        if(status === "In Progress") {
            row.style.background = "#e3f2fd";
        }
    });

    //current date
    const curretDate = document.getElementById("currentDate");

    if (currentDate) {
        const today = new Date();
        currentDate.innerHTML = today.toDateString();
    }
});