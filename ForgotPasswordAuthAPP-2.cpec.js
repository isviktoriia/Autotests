const validEmail = 'viktoriia.isaienko+autotest@solidopinion.com'
  
const fillEmailInput = (email) => {
  cy.get('input#email').should('be.visible').type(email)
}

const checkCaptcha = () => {
  cy.get('div.g-recaptcha').should('be.visible').click(35,40)
}

const submitForm = () => {
  cy.get('button').contains('Send').should('be.visible').click()
}

const sendForm = (email, captchaChecked) => {
  fillEmailInput(email)  
  if(captchaChecked === true) checkCaptcha()
  submitForm()
}

describe('ForgotPasswordAuthAPP', () => {
  before(() => {
    cy.visit('https://soapps.net/test/auth/forgot')
  })

  describe('layout', () => {
    it('#1 renders header title', () => {
      cy.get('span').contains('Forgot password').should('be.visible')
    })

    it('#2 renders form fields', () => {
      cy.get('span').should('to.contain', 'Email').should('be.visible')
      cy.get('input#email').should('be.visible')
      cy.get('div.g-recaptcha').should('be.visible')
      cy.get('button').contains('Send').should('be.visible')
      cy.get('button').contains('Cancel').should('be.visible')
    })

    it('#3 opens login page when click Log In button', () => {
      cy.visit ('https://soapps.net/test/auth/forgot')
      cy.server ()
      cy.contains('Log In').should('have.attr', 'href', '/test/auth/login').should('be.visible')
      cy.contains('Log In').click()
      cy.wait (2000)
      cy.contains('Login')
    })

    it('#4 opens login page when click Cancel button', () => {  
    cy.visit ('https://soapps.net/test/auth/forgot')
    cy.server ()
    cy.contains('button','Cancel').should('be.visible')
    cy.contains('button','Cancel').click()
    })
  })
  
  describe('flow', () => {
    it('#9 form submit with valid email && with not checked captcha', () => {
    cy.visit ('https://soapps.net/test/auth/forgot')
    cy.server ()
    cy.get('input#email').type(validEmail)
    cy.contains('Send').click()
    cy.contains('Please show that you are not a robot').should('be.visible')
    })

    it('#12 form submit with empty email input && with checked captcha', () => {
    cy.visit ('https://soapps.net/test/auth/forgot')
    cy.server ()
    cy.contains('Send').click()
    cy.contains('Please enter valid address').should('be.visible')})
  })
})