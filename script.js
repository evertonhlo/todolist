'use strict';


//banco de dados
// let banco = [  ];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));


// cria o elemento, adiciona uma classe, e se basejia no .innerHTML
// usa string dentro de acentos.
// depois insere o Elemento como elemento filho do id, 
//nos parentes (tarefa é o que o usuário vai digitar e estatus é para indicar checked)
const criarItem = (tarefa, status, indice) =>{
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
         <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item); 
}

const limparTarefas = () =>{
    const todolist = document.getElementById('todoList');
    while(todolist.firstChild){
        todolist.removeChild(todolist.lastChild);
    }
}

// busca no banco de dados o item, e joga ele dentro da função criarItem(), que vai gerar a div com o elemento novo
const atualizarTela = () =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}   
 
const inserirItem = (evento) =>{
    const tecla = evento.key;
    const texto = evento.target.value;
   if(tecla === 'Enter'){
    const banco = getBanco();
       banco.push({ 'tarefa': texto, 'status': '' });
       setBanco(banco);
       atualizarTela();
       evento.target.value = '';
   }

}

const removerItem = (indice) =>{
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco); 
    atualizarTela();
}

const checarItem = (indice) =>{
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
        atualizarTela();

}

const clickItem =(event) =>{
   const elemento = event.target;
   if(elemento.type === 'button'){
    const indice = elemento.dataset.indice;
    removerItem(indice);
   }else if(elemento.type ==='checkbox'){
       const indice = elemento.dataset.indice;
       checarItem(indice);
   }
   
}
//busca no input de texto o que foi digitado. No callback eu chamo o inserirItem, 
// que é a função que vai conferir as teclas digitadas. 

document.getElementById('entrada').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();

  
  