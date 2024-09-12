const{ select, input, checkbox } = require("@inquirer/prompts")
const fs = require("fs").promises

let mensagem = "Bem-vindo a City Count"

let metas 

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
      metas= []  
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const listarMetas = async () => {
    if(!metas.length == 0)
        mensagem= "Não existem metas" 
        return 

    const respostas = await checkbox({
        message: "use as setas para alterar a meta, o espaço para marcar e o Enter para finalizar",
        choices: [...metas],
        instructions: false,     
    })

    metas.forEach((m) => {
        m.checked = false 
 
     })
 
    if (respostas.length == 0) {
       mensagem= "Nenhuma meta selecionada"
        return

    }


    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    mensagem= "Meta(s) Concluída(s)"
}

const cadastrarMeta = async ( ) => {
   
    const meta = await input({message: "Digite a meta..."})

    if(meta.length == 0) {
        mensagem= "A Meta não pode ser vazia."
        return
    }

    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso..."
}

const metasRealizadas = async ( ) => {
    if(!metas.length == 0)
        mensagem= "Não existem metas" 
        return 

    const realizadas = metas.filter((meta) =>{
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem= "Você ainda não realizou nenhuma meta. ;-("
        return
    }

    await select({
        message: "Metas Realizadas: " +realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(!metas.length == 0)
        mensagem= "Não existem metas" 
        return 

    const abertas = metas.filter((meta) => {
        return meta.checked != true
         //ou !meta.checked
    })

    if(abertas.length == 0) {
        mensagem= "Não existem metas abertas (:"
        return
    }

    await select({
        message:"Metas Abertas" + abertas.length,
        choices: [...abertas]
    })

}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itemsaDeletar = await checkbox({
        message: "Selecione item para exclusão",
        choices: [...metasDesmarcadas],
        instructions: false,     
    })

    if (itemsaDeletar.length == 0) {
         mensagem= "Nenhum item selecionado"
        return
    }

    itemsaDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })

    })

    mensagem= "Meta(s) deletada(s) com sucesso"
    
}

const mostrarMensagem = () => {
    console.clear();

    
    if(mensagem != "")
        console.log(mensagem)
        console.log("")
        mensagem = ""
}

const start = async () => {
    await carregarMetas()
    
    while(true){
        mostrarMensagem()
        await salvarMetas ()
        
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
                    name:"Metas Realizadas",
                    value:"realizadas"
                },
                {
                    name:"Metas abertas",
                    value:"abertas"
                },
                {
                    name:"Deletar Metas",
                    value:"deletar"
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
               
                break
            case "listar":
                await listarMetas ()
                break
            case "realizadas":
                await metasRealizadas ()
                break
            case "abertas":
                await metasAbertas ()
                break
            case "deletar":
                await deletarMetas ()
                break
            case "sair":
                console.log("See you space")
                return
         }
    }
}

start ()