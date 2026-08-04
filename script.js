function togglePassword() {

    let passInput = document.getElementById("pass");
    let btn = document.querySelector(".show-btn");

    if (passInput.type === "password") {
        passInput.type = "text";
        btn.textContent = "Hide";
    } else {
        passInput.type = "password";
        btn.textContent = "Show";
    }

}

function login(event) {

    event.preventDefault();

    let student = {
        email: document.getElementById("email").value,
        pass: document.getElementById("pass").value
    };

    fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })

    .then(response => response.json())

    .then(data => {

        window.location.href = "study.html";

    })

    .catch(err => {

        alert("Login failed. Please check your email and password.");

    });

}
