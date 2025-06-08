describe('Cypress intercept method examples', () => {

  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
  });
  it('Mock http response', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }, {
      statusCode: 200,
      body: [
        {
          "book_name": "Postman",
          "isbn": "RS370",
          "aisle": "22712"
        }
      ]
    }).as('getBooks');
    cy.get('button[class="btn btn-primary"]').click()
    cy.wait('@getBooks')
    cy.get('p').should('have.text', 'Oops only 1 Book available');
  })

  it('Check API response', () => {
    cy.intercept(
      'GET',
      'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    ).as('getBooks');
    cy.get('button[class="btn btn-primary"]').click()
    cy.wait('@getBooks').then(({ request, response }) => {
      cy.get('tr').should('have.length', response.body.length + 1)
    })
  })

  it('Mock https request',()=>{
    cy.intercept(
      'GET',
      'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      (req)=>{
        req.url ='https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra';
        req.continue((res) => {
          expect(res.statusCode).to.equal(403);
        });
      }
    ).as('dummyBooks');
    cy.get('button[class="btn btn-primary"]').click();
    cy.wait('@dummyBooks');
  })

})