class LoginPage {
    visit() {
        cy.visit('https://rahulshettyacademy.com/client/');
    }
    fillEmail(email) {
        cy.get('#userEmail').type(email);
    }
    fillPassword(password) {
        cy.get('#userPassword').type(password);
    }
    submit() {
        cy.get('#login').click();
    }
}
export default LoginPage;