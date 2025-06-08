///<reference types="cypress" />
import neatCsv from 'neat-csv';

describe('Session Testing with Cypress', () => {

    it('set token in broswer local storage', async() => {
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
        cy.get('.order-summary button').click();
        cy.get('td .em-spacer-1 .ng-star-inserted').then(($el) => {
            cy.wrap($el).as('invoiceNumber');
        });
        // to get the csv file by dynamic project path and read it
        cy.readFile(Cypress.config("fileServerFolder")+'/cypress/downloads/order-invoice_yasser.csv').then(async (csvData)=>{
            const csv = await neatCsv(csvData);
            console.log(csv);
            const productNameCSV = csv[0]["Product Name"];
            const invoiceNumberCSV = csv[0]["Invoice Number"];
            cy.get('@productName').then(($el) => {
                const productName = $el.text();
                expect(productName).to.equal(productNameCSV);
            });
            cy.get('@invoiceNumber').then(($el) => {
                const invoiceNumber = $el.text().split(' ')[2];
                expect(invoiceNumber).to.equal(invoiceNumberCSV);
            });
        });

    });
});