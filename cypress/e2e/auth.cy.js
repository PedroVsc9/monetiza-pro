describe('Autenticação - MonetizaPro', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/#/auth')
    cy.window().then(win => win.localStorage.clear())
  })

  it('deve cadastrar um novo usuário com sucesso', () => {
    cy.contains('Criar conta').click()
    cy.get('input[type="text"]').type('Pedro Teste')
    cy.get('input[type="email"]').type('pedro@teste.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/auth')
  })

  it('deve fazer login com sucesso', () => {
    cy.contains('Criar conta').click()
    cy.get('input[type="text"]').type('Pedro Login')
    cy.get('input[type="email"]').type('pedro@login.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.visit('http://localhost:5173/#/auth')
    cy.get('input[type="email"]').type('pedro@login.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/auth')
  })

  it('deve exibir erro com senha incorreta', () => {
    cy.contains('Criar conta').click()
    cy.get('input[type="text"]').type('Pedro Erro')
    cy.get('input[type="email"]').type('pedro@erro.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.visit('http://localhost:5173/#/auth')
    cy.get('input[type="email"]').type('pedro@erro.com')
    cy.get('input[type="password"]').type('senhaerrada')
    cy.get('button[type="submit"]').click()
    cy.contains('Senha incorreta').should('be.visible')
  })

  it('deve exibir erro com email não cadastrado', () => {
    cy.get('input[type="email"]').type('naoexiste@teste.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('não encontrado').should('be.visible')
  })
})
