context('Login page', () => {
  beforeEach(() => {
    // cy.visit('/login');
    cy.visit('/#/login');
  });

  it('Should show an error for invalid credentials', () => {
    // cy.visit('https://promotion-project-e8793.web.app/login');
    cy.get('[formControlName=email]').type('invalid@email.com');
    cy.get('[formControlName=password]').type('invalidpassword');
    cy.get('.login-btn').click();
    cy.get('.error-form-message').should('be.visible');

  });

  it('Should redirect to main page after success login', () => {
    // cy.visit('https://promotion-project-e8793.web.app/login');
    // localStorage.setItem('user', JSON.stringify(mockUser));
    cy.get('[formControlName=email]').type('serg@gmail.com');
    cy.get('[formControlName=password]').type('Ivanytskyi');
    cy.get('.login-btn').click();
    cy.url().should('not.include', '/login');
  });

});
