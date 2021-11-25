describe('Phonebook app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3001');
    cy.contains('PhoneBok');
  });

  // it('you can add new name and number', function () {
  //   cy.visit('http://localhost:3001');

  //   cy.get('#nimi').type('willy');
  //   cy.get('#number').type('12345678');

  //   cy.get('#add').click();

  //   cy.contains('willy');
  //   cy.contains('12345678');
  // });
});
