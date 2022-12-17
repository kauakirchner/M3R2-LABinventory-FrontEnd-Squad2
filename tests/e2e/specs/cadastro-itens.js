describe("Testando Tela de cadastro de itens", () => {
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

    it("Deve retornar que os campos é obrigatório", () => {
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".btn-info").click();
        cy.contains("span", "Campo obrigatório.")
    })
    
    it("Deve retornar que o código de patrimômio é inválido", () => {
        const invalidPatrimonyCode = "XD444";    

        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(invalidPatrimonyCode);
        cy.get(".btn-info").click();
        cy.contains("span", "Código inválido.");
    })
    
    it("Deve retornar que o Valor do produto é inválido", () => {
        const invalidPrice = "0,5";
        
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > .col-3 > .form-control").type(invalidPrice);
        cy.get(".btn-info").click();
        cy.contains("span", "Valor inválido.");
    })
    
    it("Deve retornar que a url da imagem do produto é inválida", () => {
        const invalidUrl = "stackoverflow.com";    

        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".col-9 > .form-control").type(invalidUrl);
        cy.get(".btn-info").click();
        cy.contains("span", "URL inválida.");
    })

    it("Deve Cadastrar item com sucesso", () => {
        const url = "https://images.kabum.com.br/produtos/fotos/309501/pc-gamer-skul-3000-intel-quad-core-i3-10100f-rgb-amd-radeon-rx-550-8gb-ddr4-ssd-240gb-linux-preto-g4704-120630_1644605124_original.jpg";
        const patrimonyCode = "XX9999-842";
        const title = "Pc gamer";
        const price = "9999,99";
        const brand = "Dell";
        const model = "PC-3000";
        const description = "Anyway";

        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();

        cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(patrimonyCode);
        cy.get(":nth-child(1) > .col-6 > .form-control").type(title);
        cy.get(".form-select").select("Eletrônicos");
        cy.get(":nth-child(2) > .col-3 > .form-control").type(price);
        cy.get(".col-9 > .form-control").type(url);
        cy.get(":nth-child(3) > :nth-child(1) > .form-control").type(brand);
        cy.get(":nth-child(3) > :nth-child(2) > .form-control").type(model);
        cy.get("#text-area").type(description);
        cy.get(".btn-info").click();
        cy.contains("p", "Item inserido com sucesso!");
    })
})
