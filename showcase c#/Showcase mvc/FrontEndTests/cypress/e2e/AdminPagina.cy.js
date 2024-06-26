describe('Adminpagina', () => {
    it('shows the admin pagina', () => {
        // Visit the page
        cy.visit('https://localhost:7182/Identity/Account/Login');


        cy.get('input[name="Input.Email"]').type('mirre@mirre.nl');
        cy.get('input[name="Input.Password"]').type('Wachtwoord1!');
        cy.get('form').submit();

        cy.visit('https://localhost:7182/Home/AdminPage');


        cy.get('admin-component').should('be.visible');

    });
});
