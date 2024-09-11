const{ select, input, checkbox } = require("@inquirer/prompts")

let meta = {
    value: "Treinar 2h por dia",
    checked: false,

}

let metas = [ meta ]

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para alterar a meta, o espaço para marcar e o Enter para finalizar",
        choices: [...metas],
        instructions: false,
        
    })
    if (respostas.length == 0) {
        console.log ("Nenhuma meta selecionada")
        return

    }

    metas.forEach((m) => {
       m.checked = false 

    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    console.log("Meta(s) Concluída(s)")
}

const cadastrarMeta = async ( ) => {
    const meta = await input({message: "Digite a meta..."})

    if(meta.length == 0) {
        console.log ("A Meta não pode ser vazia.")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}


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
                await cadastrarMeta ()
                console.log(metas)
                break
            case "listar":
                await listarMetas ()
                break
            case "sair":
                console.log("Até a próxima vaqueiro")
                return
         }
    }
}

start ()