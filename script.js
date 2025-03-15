document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            // Check if it's an internal section (like #about) or a full-page navigation
            if (targetId.startsWith("#")) {
                event.preventDefault(); // Prevent default anchor behavior

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const messageInput = document.getElementById("message");
    const charCounter = document.getElementById("charCounter");
    const toggleModeBtn = document.getElementById("toggleMode");

    // // 🌙 Dark Mode Toggle
    // toggleModeBtn.addEventListener("click", () => {
    //     document.body.classList.toggle("dark-mode");
    //     toggleModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    // });

    // ✍️ Live Character Counter for Message
    messageInput.addEventListener("input", () => {
        charCounter.textContent = `${messageInput.value.length}/250`;
        if (messageInput.value.length > 250) {
            charCounter.style.color = "red";
        } else {
            charCounter.style.color = "#666";
        }
    });

    // 📩 Form Validation & Console Logging
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");
        const successMessage = document.getElementById("successMessage");

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        if (name === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        }

        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailError.textContent = "Enter a valid email.";
            isValid = false;
        }

        if (message === "") {
            messageError.textContent = "Message cannot be empty.";
            isValid = false;
        } else if (message.length > 250) {
            messageError.textContent = "Message cannot exceed 250 characters.";
            isValid = false;
        }

        if (isValid) {
            if (confirm("Are you sure you want to send this message?")) {
                console.log("Form Submitted!");
                console.log(`Name: ${name}`);
                console.log(`Email: ${email}`);
                console.log(`Message: ${message}`);

                successMessage.textContent = "🎉 Message sent successfully!";
                successMessage.style.color = "green";

                form.reset();
                charCounter.textContent = "0/250"; // Reset character counter
            }
        }
    });
});
