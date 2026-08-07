// service booking javascript
const serviceForm = document.getElementById("serviceForm");

// book-service
if (serviceForm) {
    serviceForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const customerName = document.getElementById("customerName").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const serviceType = document.getElementById("serviceType").value.trim();

        const serviceDate = document.getElementById("serviceDate").value.trim();

        const address = document.getElementById("address").value.trim();


        // validation
        if (
            customerName === "" ||
            phone === "" ||
            serviceType === "" ||
            serviceDate === "" ||
            address === "" 
        ) {
            alert("Please fill in all the required fields.");
            return;
        }

        // check phone number
        if (!/^[0-9]{10}4/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // create service data
        const serviceData = {
            customerName: customerName,
            phone: phone,
            serviceType: serviceType,
            serviceDate: serviceDate,
            address: address,
            status: "Pending",
            createdAt: new Date().toLocaleString()
        };

        // save service request
        let services = JSON.parse(localStorage.getItem("serviceRequests")) || [];

        services.push(serviceData);

        localStorage.setItem(
            "serviceRequests",
            JSON.stringify(services)
        );

        // success message
        alert("Service booked successfully! Your service request is pending.");

        // clear form
        serviceForm.reset();

        // redirect to customer dashboard
        window.location.href = "/customer-dashboard";
    });
}