const API = "http://localhost:3000";


async function carregarRecados() {

    const resposta = await fetch(`${API}/recados`);

    const recados = await resposta.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    recados.forEach(recado => {

        lista.innerHTML += `
            <div class="recado">
                ${recado.texto}
            </div>
        `;

    });
}


async function salvarRecado() {

    const campo = document.getElementById("recado");

    const texto = campo.value;

    if (texto === "") {
        return;
    }

    await fetch(`${API}/recados`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            texto: texto
        })

    });

    campo.value = "";

    carregarRecados();
}


carregarRecados();