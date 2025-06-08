///<reference types="cypress" />
describe('API Testing with Cypress', () => {
    let Isbn = 'idu 97';
    let id;
    it('invoke API "POST" and validate response', () => {
        cy.request(
            'POST',
            '/Library/Addbook.php',
            {
                "name": "Learn Appium Automation with Java",
                "isbn": Isbn.split(' ')[0],
                "aisle": Isbn.split(' ')[1],
                "author": "Yasseredu"
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('Msg', 'successfully added');
                id = response.body.ID;
            });
    });

    it('invoke API "GET" and validate response', () => {
        cy.request(
            '/Library/GetBook.php?AuthorName=Yasseredu',
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('isbn', Isbn.split(' ')[0]);
        });
    });

    it('invoke API "GET" and validate response', () => {
        cy.request(
            `/Library/GetBook.php?ID=${id}`,
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('isbn', Isbn.split(' ')[0]);
        });
    });

    it('invoke API "POST" and validate response', () => {
        cy.request(
            'POST',
            '/Library/DeleteBook.php',
            {
                "ID": id
            }
            ).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('msg', 'book is successfully deleted');
            });
    });

});