const bool = true;


// Function to show the login page and hide the game page
function showLoginPage() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// Function to show the game page and hide the login page
function showGamePage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
}

if (bool) {
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("loginLink").addEventListener("click", function(event) {
            showLoginPage();
            event.preventDefault();
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("gameLink").addEventListener("click", function() {
        showGamePage();
    });
});


if (bool){
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("loginLink").addEventListener("click", function(event) {
    // Create loginPage div
    var loginPageDiv = document.createElement('div');
    loginPageDiv.id = 'loginPage';

    // Create h2 element for "Login"
    var loginHeading = document.createElement('h2');
    loginHeading.textContent = 'Login';

    // Create container div
    var containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    // Create form element
    var loginForm = document.createElement('form');
    loginForm.id = 'loginForm';

    // Create label and input for username
    var usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.textContent = 'Username:';
    var usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';

    // Create label and input for password
    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.textContent = 'Password:';
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';

    // Create submit button
    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';

    // Append elements to form
    loginForm.appendChild(usernameLabel);
    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);

    // Append form to container div
    containerDiv.appendChild(loginForm);

    // Append h2 and container to loginPage div
    loginPageDiv.appendChild(loginHeading);
    loginPageDiv.appendChild(containerDiv);

    // Append loginPage div to the document body
    document.body.appendChild(loginPageDiv);

    event.preventDefault();
});


})

}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("gameLink").addEventListener("click", function() {
        // Verwijder de login-pagina als die bestaat
        var existingLoginPage = document.getElementById("loginPage");
        if (existingLoginPage) {
            existingLoginPage.remove();
        }
    });
    })