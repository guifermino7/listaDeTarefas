const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
    const li = document.createElement("li");
    return li;
}

inputTarefa.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput () {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += " ";
    const botaoApagar = document.createElement("button");
    botaoApagar.innerText = "Feito";
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.setAttribute("tittle", "Apagar essa tarefa");
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();

    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener("click", function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function(event) {
    const el = event.target;

    if (el.classList.contains("apagar")) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("Feito", "").trim();
        console.log(tarefaTexto);
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJson);
}

function adicionaTarefasSalvar() {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvar()
