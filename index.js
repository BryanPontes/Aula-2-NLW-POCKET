const{ select } = require("@inquirer/prompts")

const start = async () => {
    
    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value:"cadastrar"
                },
                {
                    name:"Listar Metas",
                    value:"listar"
                },
                {
                    name:"Sair",
                    value:"sair"
                }
                
            ]
        })

        switch(opcao){
            case "cadastrar":
                console.log("VAPO INFERNO")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima vaqueiro")
                return
         }
    }
}

start ()