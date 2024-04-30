module.exports = {

    zubehoer: function zubehoer() {

        // ----------------------- ADD KLEMMTRAEGER TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/klemmtraeger-slim')

        // select farbe
        cy.get('.product-options > :nth-child(1) select').select('grau')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()


        // ----------------------- ADD SPANNSCHUH TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/spannschuh')

        // select farbe
        cy.get('.product-options > :nth-child(1) select').select('grau')
        // set Menge
        cy.get('.product-options .additional_option_item').last().find('select').select('1 Spannschuh')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()

        // ----------------------- ADD BEDIENGRIFF DESIGN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/bediengriff-design')

        // select farbe
        cy.get('.product-options > :nth-child(1) select').select('silbergrau')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()

        // ----------------------- ADD WANDWINKEL TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/wandwinkel')

        // select farbe
        cy.get('.product-options > :nth-child(1) select').select('bronze')
        // set Menge
        cy.get('.product-options .additional_option_item').last().find('select').select('1 Wandwinkel')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()

    }
}