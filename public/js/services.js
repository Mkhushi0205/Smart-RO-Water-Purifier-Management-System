// service booking javascript
const serviceForm = document.getElementById("serviceForm");

// book-service
if (serviceForm) {
    serviceForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const customerName = document.getElementById("customerName").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const serviceType = document.getElementById("serviceType").value.trim();

        const preferredDate = document.getElementById("preferredDate").value.trim();

        const address = document.getElementById("address").value.trim();


        // validation
        if (
            customerName === "" ||
            email === "" ||
            phone === "" ||
            serviceType === "" ||
            problemDescription === "" ||
            preferredDate === "" ||
            address === "" 
        ) {
            alert("Please fill in all the required fields.");
            return;
        }

        // check phone number
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // create service data
        const serviceData = {
            customerName: customerName,
            phone: phone,
            serviceType: serviceType,
            preferredDate: preferredDate,
            address: address,
            status: "Pending",
            createdAt: new Date().toLocaleString()
        };

        // save service request
        const response  = await fetch("/book-service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        });
        
        // let services = JSON.parse(localStorage.getItem("serviceRequests")) || [];

        // services.push(serviceData);

        // localStorage.setItem(
        //     "serviceRequests",
        //     JSON.stringify(services)
        // );

        // success message
        alert("Service booked successfully! Your service request is pending.");

        // clear form
        serviceForm.reset();

        // redirect to customer dashboard
        window.location.href = "/customer-dashboard";
    });
}