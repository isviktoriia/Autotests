const login = (email ='viktoriia.isaienko+autotest@solidopinion.com', password ='qwerty11') => {
    cy.server()
    cy.route('POST', '/test/auth/api/signin').as('login')
    cy.get('input#email').type(email)
    cy.get('input#password').type(password)
}
describe('Login', () => {
    beforeEach(() => {
        cy.visit ('https://soapps.net/test/auth/')
        cy.clearCookies ()
    })
    it('1.login with the Log in', () => {
        login()
        cy.get('button').contains('Log In').click()
        cy.wait('@login')
        cy.contains('Get started with SolidOpinion').should('be.visible')
        })
    it('1.1.Login with the button',() => {
        login()
        cy.get('input#password').type('{Enter}')
        cy.wait('@login')
        cy.contains('Get started with SolidOpinion').should('be.visible')
    })
    // find social icon instead of login with social icon
    it('2.Login with the social button', () => {
        cy.contains('Connect with').should('be.visible')
        cy.get('li:nth-child(1) > i').should('be.visible')
        cy.get('li:nth-child(2) > i').should('be.visible')
        cy.get('li:nth-child(3) > i').should('be.visible')
        cy.get('li:nth-child(4) > i').should('be.visible')
    })
    it('3.Check Keep me logged in', () => {
        login()
        cy.contains('Keep me logged in').should('be.visible')
        cy.get('[type="checkbox"]').should('be.visible').check({ force: true }).should('be.checked')
        cy.get('button').contains('Log In').click()
        cy.wait('@login')
        cy.contains('Get started with SolidOpinion').should('be.visible')
    })
    it('3.1.Check Keep me logged in - uncheck', () => {
        login()
        cy.contains('Keep me logged in').should('be.visible')
        cy.get('[type="checkbox"]').should('be.visible').uncheck({ force: true }).should('to.not.be.checked')
        cy.get('button').contains('Log In').click()
        cy.wait('@login')
        cy.contains('Get started with SolidOpinion').should('be.visible')
    })
    it('4.Click Forgot password', () => {
        login()
        cy.contains('Forgot your password?').should('be.visible').click()
        cy.contains('Forgot password').should('be.visible')
    })
    it('5. Click Sign up for SolidOpinion', () => {
        login()
        cy.contains('Sign up for SolidOpinion').should('be.visible').click()
        cy.contains('Sign Up').should('be.visible')
    })
    it('6. Login with empty fields', () => {
        cy.get('button').contains('Log In').click()
        cy.get('input#email').should('have.attr','error', 'Please enter valid address')
        cy.get('input#password').should('have.attr','error', 'At least 6 characters')
    })
    it('7.Loging with wrong password ', () => {
       login('viktoriia.isaienko+autotest@solidopinion.com','qwerty')
       cy.get('button').contains('Log In').click()
       cy.contains('Incorrect email or password').should('be.visible')
    })
})