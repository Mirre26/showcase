const form = document.querySelector(".form-contactpagina");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");




email.addEventListener("input", (event) => {
    // Each time the user types something, we check if the
    // form fields are valid.

    if (email.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
    } else {
        // If there is still an error, show the correct error
        showError();
    }
});
function sendFormData(formData) {
    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                document.getElementById('loader').style.display = "none";
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Response:', data);
            document.getElementById('loader').style.display = "none";
            alert('Bericht verstuurd!');
            document.getElementById('contactForm').reset();
            displayCaptcha();
        })
        .catch(error => {
            document.getElementById('loader').style.display = "none";
            console.error('Error:', error);
        });
}

// Attach event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        document.getElementById('loader').style.display = "flex";
        if (validateCaptcha()) {
            // Get form data
            const formData = {};
            var formElements = this.elements;
            for (var i = 0; i < formElements.length; i++) {
                var element = formElements[i];
                if (element.name) {
                    formData[element.name] = element.value;
                }
            }

            // Send form data using AJAX
            sendFormData(formData);
        } else {
            return;
        }
    });

    // Handle click event for the clear form button
    document.getElementById('clearFormButton').addEventListener('click', function () {
        // Reset the form
        document.getElementById('contactForm').reset();
    });
});



function showError() {
    if (email.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        emailError.textContent = "You need to enter an e-mail address.";
    } else if (email.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = "Entered value needs to be an e-mail address.";
    } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `E-mail should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    // Set the styling appropriately
    emailError.className = "error active";
}
