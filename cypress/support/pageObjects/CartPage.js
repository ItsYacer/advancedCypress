class CartPage {
    verifyCheckoutButton() {
        cy.get('.subtotal > ul > :nth-child(3) > .btn').should('have.text', 'Checkout');
    }
    clickCheckout() {
        cy.get('.subtotal > ul > :nth-child(3) > .btn').click();
    }
}
export default CartPage;