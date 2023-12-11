context('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  it('Should redirect to edit-info component', () => {
    cy.get('#profile-btn').should('exist').should('be.visible');
    cy.get('#profile-btn').click();
    cy.get('#profile-edit-btn').should('exist').should('be.visible');
    cy.get('#profile-edit-btn').contains('Edit Profile').click();

    cy.location('pathname').should('include', '/account');
  });

  it('Should redirect to add-new-article component', () => {
    cy.get('#add-article-btn').should('exist').should('be.visible');
    cy.get('#add-article-btn').click();
    cy.location('pathname').should('include', '/app-add-new-article');
  });

  it('Should create article and redirect to main page', () => {
    cy.get('#add-article-btn').click();
    cy.get('[formControlName=title]').type('e2e test title');
    cy.get('[formControlName=category]').click();
    cy.get('mat-option').contains('Media').click();
    // cy.get('[formControlName=category]').select('Media');
    cy.get('[formControlName=text]').type('e2e test text');
    cy.get('#create-article-btn').click();
    cy.location('pathname').should('not.include', '/app-add-new-article');
  });

});
