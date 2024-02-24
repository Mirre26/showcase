class GDPR {
    constructor() {
        this.bindEvents();

        if (this.cookieStatus() !== 'accept' && this.cookieStatus() !== 'reject') this.showGDPR();
    }

    bindEvents() {
        // Event listeners for "Ja, natuurlijk" and "Nee dankje" buttons
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.hideGDPR();
            this.displayUserChoicePopup(true); // Display the user's choice
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.hideGDPR();
            this.displayUserChoicePopup(false); // Display the user's choice
        });
    }


    cookieStatus(status) {
        if (status) localStorage.setItem('gdpr-consent-choice', status);
        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        const getDate = {
            datum: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
            tijd: date.getHours() + ':' + date.getMinutes()
        };
        const dateJSON = JSON.stringify(getDate);
        if (status == 'accept') localStorage.setItem('date-time', dateJSON);
        return localStorage.getItem('gdpr-consent-choice');
    }

    showGDPR() {
        document.querySelector('.popup#popup').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
    }

    hideGDPR() {
        document.querySelector('.popup#popup').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
    }
    displayUserChoicePopup(choice) {
        const choiceMessage = choice ? 'U heeft de cookies geaccepteerd.' : 'U heeft de cookies geweigerd.';
        document.getElementById('userChoiceMessage').innerText = choiceMessage;
        document.getElementById('choicePopup').style.display = 'block';
    }

    // Method to close the choice popup
    closeChoicePopup() {
        document.getElementById('choicePopup').style.display = 'none';
    }

    scrollToContact() {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }


}

const gdpr = new GDPR();
