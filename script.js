// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("registerUsername").value.trim();
        const password = document.getElementById("registerPassword").value;

        try {
            const response = await fetch("http://127.0.0.1:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            document.getElementById("registerMessage").textContent =
                data.message;

            if (response.ok) {
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1500);
            }

        } catch (error) {
            document.getElementById("registerMessage").textContent =
                "❌ Backend connection failed.";
        }
    });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = "wallet.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("❌ Backend connection failed.");
        }
    });
}


// WALLET
let balance = Number(localStorage.getItem("balance")) || 0;

const balanceElement = document.getElementById("balance");

if (balanceElement) {
    balanceElement.textContent = "₹" + balance;
}


function loadMoney() {
    const amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    balance = balance + amount;

    localStorage.setItem("balance", balance);

    document.getElementById("balance").textContent = "₹" + balance;

    document.getElementById("message").textContent =
        "Money loaded successfully!";

    document.getElementById("amount").value = "";
}


function logout() {
    window.location.href = "index.html";
}


function checkFraud() {

    const amount = Number(document.getElementById("fraudAmount").value);
    const result = document.getElementById("fraudResult");

    if (amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    if (amount >= 10000) {
        result.textContent =
            "⚠️ Transaction flagged for fraud review.";
    } else {
        result.textContent =
            "✅ Transaction appears safe.";
    }
}