document.addEventListener("DOMContentLoaded", () => {
    
    const contactForm = document.getElementById("contactForm");
    const messageBox = document.getElementById("formMessage");
    const submitButton = contactForm?.querySelector("button[type = 'submit']");


    // contact form submit
    if(contactForm) {
        contactForm.addEventListener("submit", async(event) => {

            event.preventDefault();

            // get form value
            const formData = new FormData(contactForm);

            const name = formData.get("name")?.trim();
            const email = formData.get("email")?.trim();
            const phone = formData.get("phone")?.trim();
            const service = formData.get("service")?.trim();
            const message = formData.get("message")?.trim();

            // basic validation
            if(!name || !email || !phone || !message) {
                showMessage(
                    "Please fill in all the fields.",
                    "error"
                );
                return;
            }

            // email validation
            const emailPattern = 
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailPattern.test(email)) {
                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );
                return;
            }

            // phone validation
            const phonePattern = /^[0-9]{10}$/;

            if(!phonePattern.test(phone)) {
                showMessage(
                    "Please enter a valid 10-digit phone number.",
                    "error"
                );
                return;
            }

            // disable button while submitting
            if(submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            try {
                // send form data to backend
                const response = await fetch("/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        service,
                        message
                    })
                });

                const data = await response.json();

                if(response.ok) {
                    showMessage(
                        data.message ||
                        "Your message has been sent successfully!",
                        "success"
                    );

                    // clear form
                    contactForm.reset();
                    
                } else {
                    showMessage(
                        data.message ||
                        "Unable to send your message.",
                        "error"
                    );
                }
            } catch(error) {
                console.error(
                    "Contact from error:",
                    error
                );

                showMessage(
                    "Something went wrong. Please try again later.",
                    "error"
                );

            } finally {
                if(submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                }
            }
        });
    }


    // disabled success/error message
    function showMessage(message, type) {
        if(!messageBox) {
            alert(message);
            return;
        }

        messageBox.textContent = message;

        messageBox.className = "form-message";

        if(type === "success") {
            messageBox.classList.add("success");
        } else {
            messageBox.classList.add("error");
        }

        messageBox.style.display = "block";

        // hide message after 5 second
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 5000);
    }
});