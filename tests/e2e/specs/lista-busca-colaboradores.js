describe("Teste listagem colaboradores", () => {
    const email = "mcoelho@email.com";
    const password = "@abc1234";

    before(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`);
    })

    afterEach(() => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click();
    })

    it("Acessa a página inicial e lista os colaboradores", () => {
        const fullName = "Kauã Kirchner de Souza";
        const birthDate = "2005-01-07";
        const phone = "48984995578";
        const email= "kauakirchner@email.com";
        const cep = "88010-400";
        const houseNumber = "96";
        const complement = "anyway";
        const referencePoint = "Árvores";
        
        cy.get('.btns-div > :nth-child(2) > :nth-child(2)').click();
        cy.get('.slider').click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(fullName);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(birthDate);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(phone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(email);
        cy.get(":nth-child(3) > .form-select").select("DevOps");
        cy.get(':nth-child(5) > .col-4 > .form-control').type(cep)
        cy.get(':nth-child(6) > .col-2 > .form-control').type(houseNumber);
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').type(complement);
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(referencePoint);
        cy.get(".btn-info").click();

        cy.get('.btns-div > :nth-child(2) > :nth-child(3)').click();
        cy.contains('.first', "Deputado Tiririca");

        cy.get('#search-user').type("Tiririca", {force: true});
        cy.contains('.first', "Deputado Tiririca");
    })
})
