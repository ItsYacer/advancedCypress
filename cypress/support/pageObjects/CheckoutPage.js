class CheckoutPage {
    fillCountry(country) {
        cy.get('.form-group > .input').type(country);
        cy.get(':nth-child(3) > .ng-star-inserted').click();
    }
    submitOrder() {
        cy.get('.btnn').click();
    }
}
export default CheckoutPage;