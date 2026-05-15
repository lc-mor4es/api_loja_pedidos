async function buscarGeral() {
    try {
        const response = await fetch("http://localhost:5026/api/Cliente");
        const clientes = await response.json();

        const lista = document.getElementById("cliente-lista");
        lista.innerHTML = "";

        clientes.forEach(c => {
            const li = document.createElement("li");
        
            li.innerHTML = `
                <span><strong>Nome:</strong> ${c.nome} | <strong>Email:</strong> ${c.email}</span>
                <div>
                    <button class="btn-editar" onclick="editar('${c.idCliente}','${c.nome}','${c.email}')">
                        editar
                    </button>
                    <button class="btn-deletar" onclick="deletarCliente('${c.idCliente}')">
                        deletar
                    </button>
                </div>
            `;
        
            lista.appendChild(li);
        });

    } catch (error) {
        console.log("Erro ao buscar clientes", error);
    }
}

buscarGeral();

let clienteeditado = null;

function editar(id, nome, email) {
    document.getElementById("nomecliente").value = nome;
    document.getElementById("emailcliente").value = email;

    clienteeditado = id;
}

async function cadastrarcliente() {
    const nome = document.getElementById("nomecliente").value;
    const email = document.getElementById("emailcliente").value;

    try {
        await fetch("http://localhost:5026/api/Cliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email })
        });

        alert("Cliente cadastrado com sucesso");

        buscarGeral();

    } catch (error) {
        console.log("Erro ao cadastrar", error);
    }
}

async function atualizarcliente() {

    if (!clienteeditado) {
        alert("Clique em editar primeiro");
        return;
    }

    const nome = document.getElementById("nomecliente").value;
    const email = document.getElementById("emailcliente").value;

    try {
        await fetch(`http://localhost:5026/api/Cliente/${clienteeditado}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idcliente: clienteeditado,
                nome,
                email
            })
        });

        alert("Cliente atualizado com sucesso");

        clienteeditado = null;

        buscarGeral();

    } catch (error) {
        console.log("Erro ao atualizar", error);
    }
}

async function deletarCliente(idCliente) {

    try {
        const response = await fetch(`http://localhost:5026/api/Cliente/${idCliente}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar cliente");
        }

        alert("Cliente deletado com sucesso");

        buscarGeral();

    } catch (error) {
        console.log("Erro ao deletar", error);
    }

    window.location.reload();
}
