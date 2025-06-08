///<reference types="cypress" />

describe('Session Testing with Cypress', () => {

    it('set token in broswer local storage', async () => {
        cy.loginByAPI().then(function () {
            cy.visit('https://rahulshettyacademy.com/client/', {
                onBeforeLoad: function () {
                    // Set the token in local storage before the page loads
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            });
        });
        cy.get('.card-body b').eq(1).then(($el) => {
            cy.wrap($el).as('productName');
        });
        cy.get('.card-body button:last-of-type').eq(1).click();
        cy.wait(5000);

        cy.get('[routerlink*="cart"]').click();
        cy.contains('Checkout').click();
        cy.get('[placeholder*="Country"]').type('ind')
        cy.get('.ta-results button').each(($el, index, $list) => {
            if ($el.text().trim() === 'India') {
                cy.wrap($el).click();
            }
        });
        cy.wait(3000);
        cy.get('.action__submit ').click();
        cy.wait(3000);
        cy.get('.order-summary button').contains('Excel').click();
        cy.get('td .em-spacer-1 .ng-star-inserted').then(($el) => {
            cy.wrap($el).as('invoiceNumber');
        });

        const filePath = Cypress.config("fileServerFolder") + '/cypress/downloads/order-invoice_yasser.xlsx';
        // to validate the product name in the excel file under sepecific column
        cy.task('convertExcelToJson', filePath).then((result) => {
            cy.log(result);
            cy.get('@productName').then((productName) => {
                expect(productName).to.equal(result[1].B);
            });
        });

        // to validate the product in the excel file overall
        cy.readFile(filePath).then((fileContent) => {
            cy.get('@productName').then((productName) => {
                expect(fileContent).to.include(productName);
            });
        });


    });
});