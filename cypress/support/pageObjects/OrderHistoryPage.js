class OrderHistoryPage {
    verifySuccessMessage() {
        cy.get('.hero-primary').should('have.text', ' Thankyou for the order. ');
    }
    goToOrderHistory() {
        cy.get('.hero-primary').click();
    }
    selectOrder() {
        cy.get(':nth-child(2) > .em-spacer-1 > label').click();
    }
    viewOrderDetails() {
        cy.get(':nth-child(1) > :nth-child(6) > .btn').click();
    }
    backToOrders() {
        cy.get('.btn-container > .btn').click();
    }
}
export default OrderHistoryPage;