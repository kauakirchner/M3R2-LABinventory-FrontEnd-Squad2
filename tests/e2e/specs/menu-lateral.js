describe("Testa botoes do menu lateral", () => {
    const email = "mcoelho@email.com";
    const password = "@abc1234";

    before(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`);
    })

    it("Clicar em botoes do menu lateral para validar componentes, rotas e o hide", () => {

        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.contains("p", "Inventario");
        cy.contains("h3", "Buscar itens");
        
        cy.get('.btns-div > :nth-child(2) > :nth-child(2)').click();
        cy.contains("p", "Cadastro de colaborador");
        cy.contains("p", "Preencha os campos para cadastrar");
        
        cy.get('.btns-div > :nth-child(2) > :nth-child(3)').click();
        cy.contains("p", "Colaboradores");
        cy.contains("h3", "Buscar um colaborador");
        
        cy.get('.btns-div > :nth-child(3) > :nth-child(2)').click();
        cy.contains("p", "Cadastro de item");
        cy.contains("p", "Preencha os campos para cadastrar");
        
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click();
        cy.contains("p", "Emprestar");
        cy.contains("h3", "Buscar por patrimônio");
        
        cy.get('#switchCircle').click();
        cy.get(':nth-child(1) > :nth-child(1) > .onlyIcon > .fa-solid');
        cy.get('#switchCircle').click();
        
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click();
        cy.get('.v-toast__text', { timeout: 5000 }).should('contain', 'Logout efetuado com sucesso.');
    })
})
