describe("Testando Tela de cadastro de itens", () => {
    it("Deve retornar que os campos são obrigatórios", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".btn-info").click();
        cy.contains("span", "Campo obrigatório.");
    })
    it("Deve retornar que eu devo inserir meu nome completo", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const nomeInvalido = "Kauã";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeInvalido)
        cy.get(".btn-info").click();
        cy.contains("span", "Informe o nome completo");
    })
    it("Deve retornar que eu devo inserir um numero de telefone com DDD", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const numeroTelefoneInvalido = "40028922";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(numeroTelefoneInvalido)
        cy.get(".btn-info").click();
        cy.contains("span", "Utilize apenas números, com DDD");
    })
    it("Deve retornar que eu devo inserir um email válido", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const emailInvalido = "kauaemailinvalido";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailInvalido)
        cy.get(".btn-info").click();
        cy.contains("span", "Email inválido.");
    })
    it("Deve retornar que o cadastro foi feito com sucesso quando passada todas as informações", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const nomeCompleto = "Kauã Kirchner de Souza";
        const dataNascimento = "2005-01-07";
        const telefone = "48984995578";
        const emailColaborador = "kaua@email.com";
        const cep = "88010-400";
        const numeroDaCasa = "96";
        const complemento = "anyway";
        const pontoDeReferencia = "Árvores";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(4) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(5) > .col-2 > .form-control").type(numeroDaCasa);
        cy.get(":nth-child(6) > :nth-child(1) > .form-control").type(complemento);
        cy.get(":nth-child(6) > :nth-child(3) > .form-control").type(pontoDeReferencia);
        cy.get(".btn-info").click();
        cy.contains("p", "Dados do colaborador salvos com sucesso.");
    })
})