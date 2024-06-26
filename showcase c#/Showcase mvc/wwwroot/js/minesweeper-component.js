// Define the custom element
class MinesweeperComponent extends HTMLElement {
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
                <h1>Welcome to Minesweeper</h1>
                <p>Experience the excitement of Minesweeper. </p>
                <div class="feature">
                    <span class="icon">&#9873;</span>
                    <div class="feature-text">Customizable difficulty levels to challenge your skills.</div>
                </div>
                <div class="feature">
                    <span class="icon">&#128202;</span>
                    <div class="feature-text">Leaderboards to compete with friends and players worldwide.</div>
                </div>
                <div class="feature">
                    <span class="icon">&#128640;</span>
                    <div class="feature-text">Interactive tutorial for new players to learn the game.</div>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Define the custom element
customElements.define('minesweeper-component', MinesweeperComponent);
