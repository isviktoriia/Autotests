it('Sign up redirect', () => {
    cy.clearCookies ()
    cy.visit ('https://soapps.net/test/auth/login?redirect_url=https://soapps.net/test/integrations/')
    cy.get ('span').contains('Sign up for SolidOpinion').click()
    cy.get('span').contains('Sign Up').should('be.visible')
})

it('Already have an account redirect',() => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.get ('span').contains('Already have an account?').click()
    cy.get('span').contains('Login').should('be.visible')
})

it('Terms and Policies redirect',() => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.get ('span').contains('Terms and Policies').should('have.attr', 'href', '//solidopinion.com/terms/')
})

 /*it('Cancel redirect', () => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.get ('span').contains('Cancel').click()
    cy.wait(2000)
    cy.get('span').contains('Login')
})*/

it('Google sign in', () => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.get (':nth-child(4) > .sc-kEYyzF').click()
    //cy.window().then((win) => {
    //cy.get('input#identifireId').type('annachmul066@gmail.com'),}
    //открывается попап - не пойму как его выудить
})

it('Facebook sign in', () => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.get (':nth-child(1) > .sc-kEYyzF').click()
    //cy.window().then((win) => {
    //cy.get('input#identifireId').type('annachmul066@gmail.com'),}
    //открывается попап - не пойму как его выудить
})

it('Sign up ok- click', () => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.server()
    cy.route('POST', 'https://soapps.net/test/auth/api/signup').as ('signup')
    cy.get ('input#username').type(Math.floor(Math.random() * 100001))
    cy.get ('input#email').type(Math.floor(Math.random() * 100001)+'@test.com')
    cy.get ('input#password').type('fake.password')
    cy.get ('input#rePassword').type('fake.password')
    cy.get ('button').contains('Sign Up').click()
    cy.wait('@signup').then((response) => {
        cy.expect(response.status).to.eq(200)
    })
})


it('Sign up ok - enter', () => {
    cy.clearCookies ()
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.server()
    cy.route('POST', 'https://soapps.net/test/auth/api/signup').as ('signup')
    cy.get ('input#username').type(Math.floor(Math.random() * 100001))
    cy.get ('input#email').type(Math.floor(Math.random() * 100001)+'@test.com')
    cy.get ('input#password').type('fake.password')
    cy.get ('input#rePassword').type('fake.password').type('{enter}')
    cy.wait('@signup').then((response) => {
        cy.expect(response.status).to.eq(200)
    })
})

it('Sign up - empty fields', () => {
    cy.clearCookies ()
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.get ('button').contains('Sign Up').click()
    cy.get ('span').contains('At least 3 characters').should('be.visible')
    cy.get ('span').contains('Please enter valid address').should('be.visible')
    cy.get ('span').contains('At least 6 characters').should('be.visible')
    cy.get ('span').contains('Please retype password').should('be.visible')
})

it('Sign up - name is taken', () => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.server()
    cy.route('POST', 'https://soapps.net/test/auth/api/signup').as ('signup')
    cy.get ('input#username').type('Anna Chmul') // нужно вводить переменную типа юзер 1, чтоб не хардкодить креды?
    cy.get ('input#email').type((Math.floor(Math.random() * 100001)+'@test.com'))
    cy.get ('input#password').type('fake.password')
    cy.get ('input#rePassword').type('fake.password')
    cy.get ('button').contains('Sign Up').click()
    cy.wait('@signup').then((response) => {
        cy.expect(response.status).to.eq(409)
    })
    cy.get ('span').contains('The name is taken. Try another').should('be.visible')
})

it('Sign up - email is taken', () => {
    cy.visit ('https://soapps.net/test/auth/signup?redirect_url=https://soapps.net/test/integrations/')
    cy.server()
    cy.route('POST', 'https://soapps.net/test/auth/api/signup').as ('signup')
    cy.get ('input#username').type(Math.floor(Math.random() * 100001))
    cy.get ('input#email').type('anna.chmul@solidopinion.com')  // нужно вводить переменную типа юзер 1, чтоб не хардкодить креды?
    cy.get ('input#password').type('fake.password')
    cy.get ('input#rePassword').type('fake.password')
    cy.get ('button').contains('Sign Up').click()
    cy.wait('@signup').then((response) => {
        cy.expect(response.status).to.eq(409)
    })
    cy.get ('span').contains('The email is taken. Try another or login instead').should('be.visible')
})
