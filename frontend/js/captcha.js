
                                   
                   // Function to generate a random alphanumeric string
                    function generateCaptcha() {
                        var operators = ['+']; // Available operators
                        var operator = operators[Math.floor(Math.random() * operators.length)]; // Randomly select an operator
                        var num1 = Math.floor(Math.random() * 10); // Random number between 0 and 9
                        var num2 = Math.floor(Math.random() * 10); // Random number between 0 and 9
                        
                        // Construct the arithmetic expression
                        var expression = num1 + ' ' + operator + ' ' + num2;
                        return expression;
                    }
                
                    // Function to display the generated CAPTCHA
                    function displayCaptcha() {
                        var captcha = generateCaptcha();
                        document.getElementById("captcha").innerText = captcha;

                    }

                    // Function to validate the user input
                    function validateCaptcha(event) {
                        var userInput = document.getElementById("userInput").value.trim();
                        var captcha = eval(document.getElementById("captcha").innerText);

                        if (parseInt(userInput) === captcha) {
                            // Allow form submission
                            document.getElementById("userInput").value = ""; // Clear input field
                            return true;
                        } else {
                            document.getElementById('loader').style.display = "none";
                            alert("CAPTCHA did not match. Please try again.");
                            displayCaptcha(); // Refresh CAPTCHA
                            document.getElementById("userInput").value = ""; // Clear input field
                            return false;
                        }
                    }

                    // Display the CAPTCHA when the page loads
                    displayCaptcha();
        