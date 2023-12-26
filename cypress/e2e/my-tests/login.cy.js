context('Login page', () => {
  beforeEach(() => {
    cy.visit('/#/login');
  });

  it('Should show an error for invalid credentials', () => {
    cy.get('[formControlName=email]').type('invalid@email.com');
    cy.get('[formControlName=password]').type('invalidpassword');
    cy.get('.login-btn').click();
    cy.get('.error-form-message').should('be.visible');

  });

  it('Should redirect to main page after success login', () => {
    cy.get('[formControlName=email]').type('serg@gmail.com');
    cy.get('[formControlName=password]').type('Ivanytskyi');
    cy.get('.login-btn').click();
    cy.url().should('not.include', '/login');
  });

});
