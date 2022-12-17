import { faker } from '@faker-js/faker';

describe("Testando Tela de cadastro de colaboradores", () => {
    const email = "mcoelho@email.com";
    const password = "@abc1234";

    beforeEach(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`);
    })

    afterEach(() => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click();
    })

    it("Deve retornar que os campos são obrigatórios", () => {
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(1) > :nth-child(3) > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(2) > :nth-child(1) > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(2) > :nth-child(2) > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(5) > .col-4 > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");
    })

    it("Deve retornar que eu devo inserir meu nome completo", () => {
        const invalidName = "Kauã";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(invalidName);
        cy.get(".container").click();
        cy.contains("span", "Informe o nome completo");
    })

    it("Deve retornar que eu devo inserir um número de telefone válido", () => {
        const invalidPhoneNumber = "40028922";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(invalidPhoneNumber);
        cy.get(".container").click();
        cy.contains("span", "Favor digitar um telefone válido");
    })

    it("Deve retornar que o email inserido é inválido", () => {
        const invalidEmail = "kauainvalidEmail";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(invalidEmail);
        cy.get(".container").click();
        cy.contains("span", "Email inválido.");
    })

    it("Deve retornar que o colaborador foi inserido com sucesso quando passada todas as informações", () => {
        const fullName = "Kauã Kirchner de Souza";
        const birthDate = "2005-01-07";
        const phoneNumber = "48984995578";
        const email = faker.internet.email();
        const cep = "88010-400";
        const houseNumber = "96";
        const complement = "anyway";
        const referencePoint = "Árvores";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(fullName);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(birthDate);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(phoneNumber);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(email);
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");

        cy.get(":nth-child(5) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(6) > .col-2 > .form-control").type(houseNumber);
        cy.get(":nth-child(7) > :nth-child(1) > .form-control").type(complement);
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(referencePoint);
        cy.get(".btn-info").click();
        cy.get('.v-toast__text', { timeout: 5000 }).should('contain', 'Colaborador inserido com sucesso!');

    })

    it("Deve retornar que o usuário já existe na base de dados.", () => {
        const fullName = "Kauã Kirchner de Souza";
        const birthDate = "2005-01-07";
        const phone = "48984995578";
        const email= "kauakirchner@email.com";
        const cep = "88010-400";
        const houseNumber = "96";
        const complement = "anyway";
        const referencePoint = "Árvores";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(fullName);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(birthDate);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(phone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(email)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(5) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(6) > .col-2 > .form-control").type(houseNumber);
        cy.get(":nth-child(7) > :nth-child(1) > .form-control").type(complement);
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(referencePoint);
        cy.get(".btn-info").click();
        cy.get('.v-toast__text', { timeout: 5000 }).should('contain', 'Colaborador com email kauakirchner@email.com já existe.');
        
    })
})
