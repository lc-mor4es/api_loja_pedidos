async function buscarGeralP() {
    try {
        const response = await fetch("http://localhost:5026/api/Pedido/ListarPedidos");
        const pedidos = await response.json();

        const lista = document.getElementById("pedidos-lista");
        lista.innerHTML = "";

        pedidos.forEach(p => {
            const li = document.createElement("li");

            li.innerHTML = `
                <div class="pedido-info">
                    <strong>Quem pediu:</strong> ${p.nomeCliente || 'null'} <br>
                    <span>${p.descricao} - R$ ${p.valor}</span>
                </div>
                <div class="pedido-btns">
                    <button class="btn-editar" onclick="editar('${p.idpedido}','${p.descricao}','${p.valor}','${p.idcliente}')">
                        editar
                    </button>
                    <button class="btn-deletar" onclick="deletar('${p.idpedido}')">
                        deletar
                    </button>
                </div>
            `;

            lista.appendChild(li);
        });

    } catch (error) {
        console.log("Erro ao buscar pedidos", error);
    }
}

buscarGeralP();

async function carregarClientes() {
    try {
        const resposta = await fetch("http://localhost:5026/api/Cliente");
        const clientes = await resposta.json();

        const select = document.getElementById("clientepedido");
        select.innerHTML = `<option value="">Selecione um cliente</option>`;

        clientes.forEach(c => {
            const option = document.createElement("option");
            option.value = c.idCliente;
            option.text = c.nome;
            select.appendChild(option);
        });

    } catch (error) {
        console.log("Erro ao carregar clientes", error);
    }
}

carregarClientes();

let pedidoeditado = null;

function editar(id, descricao, valor, idCliente) {
    document.getElementById("descricaopedido").value = descricao;
    document.getElementById("valorpedido").value = valor;
    document.getElementById("clientepedido").value = idCliente;

    pedidoeditado = id;
}

async function cadastrarpedido() {
    const descricao = document.getElementById("descricaopedido").value;
    const valor = Number(document.getElementById("valorpedido").value);
    const idCliente = Number(document.getElementById("clientepedido").value);

    try {
        await fetch("http://localhost:5026/api/Pedido", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                descricao,
                valor,
                idCliente: idCliente
            })
        });

        alert("Pedido cadastrado");

        buscarGeralP();

    } catch (error) {
        console.log("Erro ao cadastrar pedido", error);
    }
}

async function atualizarpedido() {

    if (!pedidoeditado) {
        alert("Clique em editar primeiro");
        return;
    }

    const descricao = document.getElementById("descricaopedido").value;
    const valor = Number(document.getElementById("valorpedido").value);
    const idCliente = Number(document.getElementById("clientepedido").value);

    try {
        await fetch(`http://localhost:5026/api/Pedido/${pedidoeditado}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idpedido: pedidoeditado,
                descricao,
                valor,
                idCliente: idCliente
            })
        });

        alert("Pedido atualizado");

        pedidoeditado = null;

        buscarGeralP();

    } catch (error) {
        console.log("Erro ao atualizar pedido", error);
    }
}

async function deletar(id) {

    const confirmar = confirm("Deseja realmente excluir?");

    if (!confirmar) return;

    try {
        await fetch(`http://localhost:5026/api/Pedido/${id}`, {
            method: "DELETE"
        });

        alert("Pedido deletado");

        buscarGeralP();

    } catch (error) {
        console.log("Erro ao deletar pedido", error);
    }
}