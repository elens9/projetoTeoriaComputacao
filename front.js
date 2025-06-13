//add nova tarefa
let idCounter = 0;

function addTarefa() {
    
    const tarefa = document.getElementById("tarefa").value;
    const descricao = document.getElementById("descricao").value;
    const prazo = document.getElementById("prazo").value;

    if (!tarefa || !descricao || !prazo) {
        alert("Preencha todos os campos da tarefa!");
        return;
    }



const tarefaDiv = document.createElement("div");
    tarefaDiv.className = "tarefa-bloco";
    tarefaDiv.draggable = true;
    tarefaDiv.id = `tarefa-${idCounter++}`;
    tarefaDiv.setAttribute("data-etapa", "nova");//etapa inicial da tarefa
    tarefaDiv.innerHTML = `<strong>${tarefa}</strong><br>${descricao}<br><em>Prazo: ${prazo}</em>`;

    //eventlistener de arrastar
    tarefaDiv.addEventListener("dragstart", dragStart);
    tarefaDiv.addEventListener("dragend", dragEnd);

    document.getElementById("mostrar-tarefas").appendChild(tarefaDiv);

    //limpando os campos
    document.getElementById("tarefa").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prazo").value = "";


//event dragstart
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.classList.add("dragging");
}

function dragEnd(e) {
    e.target.classList.remove("dragging");
}

//events das caixas de destino
const boxes = document.querySelectorAll(".tarefa-box");

boxes.forEach(box => {
    box.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necessário para permitir o drop
        box.classList.add("dragover");
    });

    box.addEventListener("dragleave", () => {
        box.classList.remove("dragover");
    });

    box.addEventListener("drop", (e) => {
        e.preventDefault();
        box.classList.remove("dragover");

        const tarefaId = e.dataTransfer.getData("text/plain");
        const tarefa = document.getElementById(tarefaId);
        const destino = box.id; //fazer, verificar e aprovar
        const etapaAtual = tarefa.getAttribute("data-etapa");

        //regras de fluxo de caixas
        if(
            (destino === "fazer" && (etapaAtual === "nova" || etapaAtual === "mostrar")) ||
            (destino === "verificar" && etapaAtual === "fazer") ||
            (destino === "aprovar" && etapaAtual === "verificar")
        ){
            tarefa.setAttribute("data-etapa", destino);
            box.appendChild(tarefa)
        } else{
            alert('Você precisa seguir o fluxo Fazer --> Verificar --> Aprovar')
        }


    
    });
});
bancoDados(tarefa, descricao, prazo);
}

function bancoDados(tarefa, descricao, prazo){
    fetch("http://localhost:3000/tarefas",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({tarefa, descricao, prazo})
    })
   
    }

