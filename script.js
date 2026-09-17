// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("registerUsername").value.trim();
        const password = document.getElementById("registerPassword").value;

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        document.getElementById("registerMessage").textContent =
            "✅ Registration successful!";

        setTimeout(function() {
            window.location.href = "index.html";
        }, 1500);
    });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");

        if (username === savedUsername && password === savedPassword) {
            window.location.href = "wallet.html";
        } else {
            alert("Invalid username or password");
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