describe('Main page', () => {
  const mockUser = {
    email: 'serg@gmail.com',
    uid: 'OXGUwR3DnBcqKU1eHSTGYeBDRiH2',
    firstName: 'John',
    lastName: 'Conor',
    avatarUrl: '',
    age: '33'
  };

  beforeEach(() => {
    cy.visit('/#/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('user', JSON.stringify(mockUser));
      },
    });
  });

  it('Should redirect to edit-info component', () => {
    cy.get('#profile-btn').should('exist').should('be.visible');
    cy.get('#profile-btn').click();
    cy.get('#profile-edit-btn').should('exist').should('be.visible');
    cy.get('#profile-edit-btn').contains('Edit Profile').click();
    cy.url().should('include', 'account');
  });

  it('Should redirect to add-new-article component', () => {
    cy.get('#add-article-btn').should('exist').should('be.visible');
    cy.get('#add-article-btn').click();
    cy.url().should('include', 'add-new-article');
  });

  it('Should create article and redirect to main page', () => {
    cy.get('#add-article-btn').click();
    cy.get('[formControlName=title]').type('e2e test title');
    cy.get('[formControlName=title]').should('include.value', 'e2e test title');
    cy.get('[formControlName=category]').click();
    cy.get('mat-option').contains('Media').click();
    cy.get('[formControlName=text]').type('e2e test text');
    cy.get('[formControlName=text]').should('include.value', 'e2e test text');
  });

});
