class ShoppingPage {
    addFirstProduct() {
        cy.get(':nth-child(1) > .card > .card-body > .w-10').click();
    }
    addSecondProduct() {
        cy.get(':nth-child(2) > .card > .card-body > .w-10 > .fa').click();
    }
    goToCart() {
        cy.get(':nth-child(4) > .btn').click();
    }
}
export default ShoppingPage;