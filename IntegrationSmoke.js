const timeout = 200
const faker = require('faker')
const name = faker.fake('{{name.lastName}}')
const email = faker.internet.email()
const password = 'qwerty11'
const newUser = () => {
    cy.visit('https://soapps.net/test/auth/signup')
      cy.get('input#username').type(name)
      cy.get('input#email').type(email)
      cy.get('input#password').type(password)
      cy.get('input#rePassword').type(password)
      cy.get('button').contains('Sign Up').click()
      cy.wait(2000)
      cy.contains('To add comments to your website, please').should('be.visible')
}
const login = (email ='viktoriia.isaienko+autotest@solidopinion.com', password ='qwerty11') => {
    cy.server()
    cy.route('POST', '/test/auth/api/signin').as('login')
    cy.get('input#email').type(email)
    cy.get('input#password').type(password)
    cy.get('button').contains('Log In').click()
    cy.wait(2000)
    cy.contains('To add comments to your website, please').should('be.visible')
}
const newIntegration = () => {
    const integrationName = faker.fake('{{name.firstName}}')
    const groupName = faker.fake('{{name.lastName}}')
    cy.get('span').contains('CREATE NEW INTEGRATION').click()
    cy.get('span').contains('Name').next().type(integrationName)
    cy.get(`form input[name='group']`).clear().type(groupName)
    cy.get('span').contains('SAVE').click()
    cy.wait(timeout)
    cy.get('input[name="embedCodeComments"]').then($el => {
        const integrationId = $el.val().match(/data-integration-id="([^"]+)"/)[1]
    })
    
}
  describe('IntegrationsApp Smoke',() => {
    beforeEach(() => {
    cy.visit('https://soapps.net/test/auth/')
    cy.clearCookies()
    })
    
    it('SignUp', () => {
        newUser()
    })
    it('Create new integration - button on header', () => {
        login()
        cy.get('span').contains('CREATE NEW INTEGRATION').click()
        cy.wait(timeout)
        cy.contains('Configuration').should('be.visible')
        cy.contains('Statistic').should('not.visible')
    })
    
    it('Create new Integration - batton on body', () => {
        login()
        cy.get('header').next().as('body')
        cy.get('@body').find('button').contains('CREATE NEW INTEGRATION').click()
        cy.contains('Configuration').should('be.visible')
        cy.contains('Statistic').should('not.visible')
    })
  describe('New integration without data', () => {
    beforeEach(() => {
        cy.clearCookies()
    })
    it('Click on integration', () => {
         login()
         cy.wait(timeout)
         cy.contains('Ursula').click()
         cy.wait(timeout)
         cy.contains('Statistics').should('be.visible')
         cy.contains('Configuration').click()
         cy.get(`form input[name='name']`).should('have.value', 'Ursula')
         cy.get(`form input[name='group']`).should('have.value', 'Towne')
         cy.get(`input[name='moderationMode']`).next().contains('No moderation')
         cy.get('span').contains('Auto block commentor').next().find('input').should('have.value', 'true')
         cy.get('span').contains('Auto remove comments').next().find('input').should('have.value', 'true')
         cy.get('span').contains('Enable promo comments').next().find('input').should('have.value', 'true')
         cy.get('span').contains('Enable community').next().find('input').should('have.value', 'true')
    })
    })
  describe('Configuration tab, General settings', () => {
      beforeEach(() => {
         cy.clearCookies()
    })
    it('Create valid integration', () =>{
         login()
         cy.wait(timeout)
         cy.get('span').contains('CREATE NEW INTEGRATION').click()
         cy.get('span').contains('Name').next().type(name)
         cy.get(`form input[name='group']`).clear().type('default')
         cy.get('span').contains('SAVE').click()
         cy.wait(timeout)
         cy.get('button').should('have.class', 'SavedPage__PreviewButton-sc-10oqwds-5 dXpIVP Button-fqb64o-0 byCGcS').contains('OPEN PREVIEW')
         cy.get('span').contains('Comments embed code').should('be.visible')
         cy.get('span').contains('Community embed code').should('be.visible')
    })
    it('Create not valid integration', () => {
         login()
         cy.wait(timeout)
         cy.get('span').contains('CREATE NEW INTEGRATION').click()
         cy.get('span').contains('SAVE').click()
         cy.contains('Cannot be blank').should('be.visible')
    })
    it('Change the Name of integration, short name', () => {
         login()
         cy.wait(timeout)
         cy.contains('Llewellyn').click()
         cy.contains('Configuration').click()
         cy.get(`form input[name='name']`).should('have.value', 'Llewellyn')
         cy.get(`form input[name='name']`).clear().type('3')
         cy.get('span').contains('SAVE').click()
         cy.contains('3').should('be.visible')
    })
    it('Change the Name of integration, long name', () => {
         login()
         cy.wait(timeout)
         cy.contains('3').click()
         cy.contains('Configuration').click()
         cy.get(`form input[name='name']`).should('have.value', '3')
         cy.get(`form input[name='name']`).clear().type('1Ahj568788HSSGS ghgTYTYT09uyqab')
         cy.get('span').contains('SAVE').click()
         cy.contains('1Ahj568788HSSGS ghgTYTYT09uyqab').should('be.visible')
    })
    it('Change the Group of integration, short name', () => {
         login()
         cy.wait(timeout)
         cy.contains('Test integration').click()
         cy.contains('Configuration').click()
         cy.get(`form input[name='group']`).should('have.value', 'default')
         cy.get(`form input[name='group']`).clear().type('2')
         cy.get('span').contains('SAVE').click()
         cy.contains('Test integration').should('be.visible')
    })
    it('Change the Group of integration, long name', () => {
         login()
         cy.wait(timeout)
         cy.contains('Test integration').click()
         cy.contains('Configuration').click()
         cy.get(`form input[name='group']`).should('have.value', '2')
         cy.get(`form input[name='group']`).clear().type('1Ahj568788HSSGSghgTYTYT09uyqab')
         cy.get('span').contains('SAVE').click()
         cy.contains('Test integration').should('be.visible')
    })
    it('Change the Group of integration, default name', () => {
         login()
         cy.wait(timeout)
         cy.contains('Test integration').click()
         cy.contains('Configuration').click()
         cy.get('form input[name="group"]').should('have.value', '1Ahj568788HSSGSghgTYTYT09uyqab')
         cy.get('form input[name="group"]').next().click()
         cy.contains('default').trigger('mouseover').click({ force: true })
         cy.get('form input[name="group"]').should('have.value', 'default')
         cy.get('span').contains('SAVE').click()
         cy.contains('Test integration').should('be.visible')
    })
    it('Comments embed code', () => {
         login()
         cy.wait(timeout)
         cy.contains('CREATE NEW INTEGRATION').click()
         cy.get('span').contains('Name').next().type(name)
         cy.get(`form input[name='group']`).clear().type('default')
         cy.get('span').contains('SAVE').click()
         cy.wait(timeout)
         cy.contains('Comments embed code').click().should('Successfully copied','be.visible').
         cy.get('span').contains('Community embed code').should('be.visible').click()
    })
    it('Moderation. No moderation', () => {

      })
    it('Moderation.Post-moderation',() => {

      })
    it('Moderation.Pre-moderation', () => {

      })
    it('Enable promo comments', () => {

      })
      it('Enable relevant comments', () => {

      })
      it('Enable community', () => {

      })
      it('Colors.', () =>{

      })
      it('Colors.', () => {

      })
      it('Ranks.', () => {

      })
      it('Ranks.', () => {

      })
      it('Ranks.', () => {

      })
      it('Remove integration', () => {

      })
 })
 describe('Statistic tab', () => {
     it('Statistic tab', () => {

     })
 })
})
