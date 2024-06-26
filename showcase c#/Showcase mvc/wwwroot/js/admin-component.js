// Define the custom element
class AdminComponent extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Create the structure of the component
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Component styles */
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                }

                h1 {
                    font-size: 36px;
                    margin-bottom: 20px;
                    color: #333;
                }

                p {
                    font-size: 18px;
                    line-height: 1.6;
                    color: #666;
                }

                .feature {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .icon {
                    font-size: 48px;
                    margin-right: 20px;
                    color: #007bff;
                }

                .feature-text {
                    flex: 1;
                    text-align: left;
                }
            </style>
            <div class="container">
                <h1>Welcome to the Admin Panel</h1>
                <p>Manage your website with ease. </p>
                <div class="feature">
                    <span class="icon">&#128295;</span>
                    <div class="feature-text">User management to control access and permissions.</div>
                </div>
                <div class="feature">
                    <span class="icon">&#128218;</span>
                    <div class="feature-text">Content management for easy editing and updating.</div>
                </div>
                <div class="feature">
                    <span class="icon">&#128295;</span>
                    <div class="feature-text">Analytics dashboard for insights and monitoring.</div>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Define the custom element
customElements.define('admin-component', AdminComponent);
