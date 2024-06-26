describe('template spec', () => {
    it('passes', () => {
        cy.visit('https://localhost:7182/')

        // Check if the web component is visible
        cy.get('minesweeper-component').should('be.visible');
    })
})
