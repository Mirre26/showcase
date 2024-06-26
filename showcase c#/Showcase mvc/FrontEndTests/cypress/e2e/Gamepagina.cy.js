describe('New Game Button', () => {
    it('creates a new game when clicked', () => {
        // Visit the page
        cy.visit('https://localhost:7182/Identity/Account/Login');


        cy.get('input[name="Input.Email"]').type('626.poulus@gmail.com');
        cy.get('input[name="Input.Password"]').type('Wachtwoord1!');
        cy.get('form').submit();

        cy.visit('https://localhost:7182/Home/Game');


        // Click the New Game button
        cy.get('#newGameButton').click();

        // Check if the game container is visible
        cy.get('#gameContainer').should('be.visible');

        // Check if the game container has the expected number of rows and columns
       
    });
});
