exibir() //funçaão para exibir as despesas
resumoFinanceiro() //função para exibir o resumo financeiro

document.getElementById("formularioDespesa").addEventListener("submit", function(event) { 
    event.preventDefault() 

    var nome = document.getElementById("nome").value //pega valores dos inputs do formulario
    var valor = document.getElementById("valor").value
    var data = document.getElementById("data").value 

    if(isNaN(valor)){
        alert("Valor digitado é invalido, preencha novamente!")
        return
    }
  
    var despesa = { //cria o objeto despesa
        nome: nome,
        valor: valor,
        data: data
    }

    var listadespesa = JSON.parse(localStorage.getItem('listagem')) || [] 
     listadespesa.push(despesa) //pega a lisat de despesas do LocalSotarge (que é um array que guarda os objetos despesa, e permite salvar dados mesmo quando a gente fecha um naavegadpr), ou vai criar um array sem nada se não tiver nada salvo
   //adiciona despesa nova no array, push serve para add o novo item no FINAL (questão de prova0) do array

    localStorage.setItem('listagem', JSON.stringify(listadespesa)) //salva o array atualiado no LocalStorage, tranformanfo o array em string com o JSON

    document.getElementById("formularioDespesa").reset() //reset serve para limpar os campos do formulario
    exibir()//chamar a função de exibir para atualiar a lista
    resumoFinanceiro()//chamar a função de resumo para atualizar o resumo financeiro
})



function salvar(){ //salvar o salario
    var salario = parseFloat(document.getElementById("salario").value) //pega o valor do salario e trsnaforma ele em numero com casas decimais
    if(isNaN(salario)){ //verifica se o valor do salario é valido
        alert("O valor digitado não é valido, preencha novamente!")
        return //*lembrar da ultima atividade, o return serve para sair da função se o valor for invalido, o codigo abaixo dele não vai ser executado, e ele pode estar na função ou em laço de repetição para sair dele, o codigo funciona com ele ou sem ele 
    }

    localStorage.setItem('salario', salario) //se o salario for valido, salva ele no LocalStorage
    resumoFinanceiro() //vem depois do if pois so vai entrar aqui se o salario for valido
}
//A função salvar pega o valor do salario e verifica se o numero é valido, se for vai chamar a função resumo_Financeiro para atualizar o resumo


function deletar(){ //a função deletar vai apagar todas as despesas
    localStorage.removeItem('listagem') //LocalStorage vai remover o item listagem onde estão sendo salvas as despesas
    exibir()
    resumoFinanceiro()
}



function exibir() { //função exibe as despesas
    var listadespesa = JSON.parse(localStorage.getItem('listagem')) || [] //pega a lista de despesas do LocalStoage e se não tiver nada cria um array(que é um objeto que guarda varios intens) vazio
    var output = document.getElementById("output") //pega o ul que criei no html para exibir as despesas
    output.innerHTML = "" //limpaa a lista antes de exibir ela de novo, para não duplicar despesas
    for(let i=0; i<listadespesa.length; i++) { //laço para percorrer um array de despesas
        let li = document.createElement('li') //cria um li para cada despesa (linha da lista)
        li.textContent = 'Data: ' + listadespesa[i].data + ' Nome: ' + listadespesa[i].nome + ' Valor: R$' + listadespesa[i].valor //adiciona algo do array na linha da lista
        output.appendChild(li) //adiciona a linha na pista, o comando append serve para add elemento filho dentro de um elemento pai (questão de prova)
    }
}

function resumoFinanceiro(){ //função que exibe o resumo, ou seja, salario, despesas e saldo
    var resumo  = document.getElementById("resumo") //pega a div do resumo q criei no html
    resumo.innerHTML = "" //limpa o resumo antes de mostrar ele de novo, pra nçao duplicar informaçoes

    var salario = parseFloat(localStorage.getItem('salario')) //pega o salario do LocalStorage
    if(isNaN(salario)) salario = 0 //verifica se o salario é valido, se não for o slario vai ser 0, isNaN verifica se o valor não é um numero

    var salariop = document.createElement('p') //cria um pargrafo para exibir salario
    salariop.textContent = 'Salario: R$' + salario.toFixed(2)//adicioona o texto no paragrafo
    resumo.appendChild(salariop) //adiciona o paragrafo na div resumo que criei no html
 
    var lista = JSON.parse(localStorage.getItem('listagem')) || [] 
    var totalDespesas = 0 //variavel que vai armaenar o total de despesas

    for(let i = 0; i < lista.length; i++){ //laço que vai passar por todas as despesas e somar elas
        totalDespesas += parseFloat(lista[i].valor)//pega as despesas e soma em totalDespesas 
    }

    var despesasp = document.createElement('p') //cria paragrafo para mostrar as despesas (total)
    despesasp.textContent = 'Total de despesas: R$' + totalDespesas.toFixed(2)//adiciona o tecto no paragrafo novo
    resumo.appendChild(despesasp)//adiciona o paragrafo na div resumo

    var saldo = salario - totalDespesas//calcula saldo - valor que sobra depois de pagar as despesas
    var saldop = document.createElement('p')//cria paragrafo para mostrar saldo
    saldop.textContent = 'Saldo restante: R$' + saldo.toFixed(2)//adiciona o texto no paragrafo novo 
    resumo.appendChild(saldop)//adiciona o paragrafo na div resumo q criei no html
    
}
//resumindo a unção resumoFinanceiro vai pegar o salario do inpu, calcular o valor das despesas somando elas, e calcular o saldo diminuindo as despesas do salario, depois vai mostrar tudo na div resumo do html 
//chamar as funções para exibir a lista e o resumo quando a página carregar

window.onload = function() { //quando a janela carregar então executa as funções
    var salarioSalvo = localStorage.getItem('salario') //pega o salario salvo no LocalStorage
    if(salarioSalvo) document.getElementById('salario').value = salarioSalvo //se tiver salario salvo, coloca ele no input do salario

    exibir() //função para exibir as despesas
    resumoFinanceiro() //função para exibir o resumo financeiro
}
