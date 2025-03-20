document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");

    function checkInputs() {
        if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }

    usernameInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);
});
