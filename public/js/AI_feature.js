const chatBox = document.querySelector(".chat-box");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

//sample AI replies
const responses = {
    hello: "👋 Hello! Welcome to Shanti Enterprises. How can I help you today?",
    hi: "😊 Hi! Ask me anything about RO purifiers, installation or service.",
    price: "💰 Our RO purifier prices vary by model. Please visit the Products page or contact us for a quotation.",
    service: "🔧 We provide installation, repair, AMC and regular maintenance services.",
    filter: "💧 RO filters should generally be replaced every 6-12 months depending on water quality and usage.",
    contact: "📞 You can contact Shanti Enterprises at +91-xxxxxxxxxx or visit our Contact page.",
    thanks: "😊 You're welcome! Happy to help.",
    default: "🤖 Sorry, I don't understand that yet. Please ask about RO products, prices, installation or service."
};

//add message to chat
function addMessage(message, sender) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add(
        sender === "user" 
                ? "user-message" 
                : "bot-message");

    messageDiv.innerHTML = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

//ai response
async function sendMessage() {
    // console.log("Button clicked");

    const text = userInput.value.trim();

    if(!text) return;

    addMessage(text, "user");
    userInput.value = "";
    sendBtn.disabled = true;
     
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },

                body: JSON.stringify({
                    message: text
                })
                
            });

            const data =  await response.json();
            console.log(data);

            addMessage(data.reply, "bot");
        } catch (error) {
            console.log(error);
            addMessage("⚠️ Unable to connect to AI.", "bot");
        }

        sendBtn.disabled = false;
}


function getResponse(text) {
    text = text.toLowerCase();

    if(text.includes("hello")) return responses.hello;
    if(text.includes("hi")) return responses.hi;
    if(text.includes("price")) return responses.price;
    if(text.includes("service")) return responses.service;
    if(text.includes("filter")) return responses.filter;
    if(text.includes("contact")) return responses.contact;
    if(text.includes("thank")) return responses.thanks;

    if(text.includes("best")) {
        return "💧 We can recommend the best RO purifier based on your family size and water quality.";
    }

    if(text.includes("home")) {
        return "🏠 The best RO purifier depends on your family size and water source.";
    }

    if( text.includes("leaking") || text.includes("leak")) {
        return "🔧 Please check the pipe connections and filter housing. If the leak continues, contact our technician.";
    }

    if(text.includes("technician")) {
        return "👨‍🔧 Our technician can visit your home. Please contact us to schedule a service appointment.";
    }
    
    return responses.default;
}


//button click
sendBtn.addEventListener("click", sendMessage);

//press Enter
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

//popular question
document.querySelectorAll(".question-list button").forEach(button => {
    button.addEventListener("click", function() {
        userInput.value = this.innerText;
        sendMessage();
    });
});

