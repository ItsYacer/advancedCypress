describe('download, edit Excel file then upload again', () => {
    it('modifiy in excel file should display in UI after uploading', () => {

        let replaceText = 50;
        let searchText = "Apple";
        const _filePath = Cypress.config("fileServerFolder") + '/cypress/downloads/download.xlsx';
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');
        cy.get('#downloadButton').click();
         cy.readFile(_filePath, { timeout: 10000 }).should('exist');
        cy.task('writeExcelFile', { searchText: searchText, replaceText: replaceText, change: { rowChange: 0, colChange: 2 }, filePath: _filePath });
        cy.get('#fileinput',{ timeout: 10000 }).selectFile(_filePath);

        cy.contains(searchText).parent().next().next().should('have.text', replaceText);
    });
});