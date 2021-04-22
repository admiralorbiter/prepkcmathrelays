const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "mathrelayteam" && password === "PREPKC2021") {
        var sessionTimeout = 1; //hours
        var loginDuration = new Date();
        loginDuration.setTime(loginDuration.getTime()+(sessionTimeout*60*60*1000));
        document.cookie = "MathRelaySession=Valid; "+loginDuration.toGMTString()+"; path=/";
        alert("You have successfully logged in.");
        location=("hidden.html");
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})