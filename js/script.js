var usernameInput = document.getElementById("usernameInput");
var userEmailInput = document.getElementById("userEmailInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var signupBtn = document.getElementById("signupBtn");

var usersArray;

if(localStorage.getItem("users") == null) {
    usersArray = [];
}
else {
    usersArray = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
    if(isValid() == true && isExist() == false) {
        var user = {
            name: usernameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value,
        };
        usersArray.push(user);
        localStorage.setItem("users", JSON.stringify(usersArray));

        var confirmMsg = document.getElementById("confirmMsg");
        confirmMsg.classList.replace("d-none", "d-block");
        
        var signin = document.getElementById("signin");
        signin.classList.replace("d-none", "d-block");
    } else {
        var tryAgain = document.getElementById("tryAgainMsg");
        tryAgain.classList.replace("d-none", "d-block");
    }
}

function isExist() {
    
    var accountExistMsg = document.getElementById("accountExistMsg");
    for(var i=0; i<usersArray.length; i++) {
        if(
            usersArray[i].name.toLowerCase() == usernameInput.value.toLowerCase() ||
            usersArray[i].email.toLowerCase() == userEmailInput.value.toLowerCase() 
        ) {
            accountExistMsg.classList.replace("d-none", "d-block");
            usernameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            userPasswordInput.classList.remove("is-valid");
            return true;
        }
    }
    return false;
}

function isValid() {
    if(isNameValid() == true && isEmailValid() == true && isPasswordValid() == true) 
        return true;
    else
        return false;
}

function isNameValid() {
    var usernameAlert = document.getElementById("usernameAlert");
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    if(usernameInput.value != "" && regex.test(usernameInput.value) == true) {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
        usernameAlert.classList.replace("d-block", "d-none");
        console.log(true);
        return true;
    }
    else {
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function isEmailValid() {
    var userEmailAlert = document.getElementById("userEmailAlert");
    let regex = /@[a-z]{5,10}(\.com)$/;
    if(userEmailInput.value != "" && regex.test(userEmailInput.value) == true) {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");
        console.log(true);
        return true;
    }
    else {
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function isPasswordValid() {
    var userPasswordAlert = document.getElementById("userPasswordAlert");
    let regex = /^.{5,15}$/;
    if(userPasswordInput.value != "" && regex.test(userPasswordInput.value) == true) {
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");
        console.log(true);
        return true;
    }
    else {
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");
        console.log(false);
        return false;
    }
}

////////////////////////////////////////////

function login() {
    var loginEmail = document.getElementById("loginEmail");
    var loginPassword = document.getElementById("loginPassword");
    var loginBtn = document.getElementById("loginBtn");
    var wrongMsg = document.getElementById("wrongMsg");

    if(loginEmail.value == "" || loginPassword.value == "") {
        var fillMsg = document.getElementById("fillMsg");
        fillMsg.classList.replace("d-none", "d-block");
        return false;
    }

    for(let i=0; i<usersArray.length; i++) {
        console.log(i);
        if(
            usersArray[i].password.toLowerCase() == loginPassword.value.toLowerCase() &&
            usersArray[i].email.toLowerCase() == loginEmail.value.toLowerCase() 
        ) {
            localStorage.setItem("sessionUsername",usersArray[i].name );
            loginBtn.setAttribute("href", "welcome.html");
        }
    }
    wrongMsg.classList.replace("d-none", "d-block");
}


var username = localStorage.getItem("sessionUsername");

function displayWelcomeUser()
{
    document.getElementById("username").innerHTML = "Welcome "+ username;

}


function logout() {
    localStorage.removeItem('sessionUsername');
}
