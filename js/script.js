const campo = document.querySelector("#campo");

let quadrados = [];
for (let i = 0; i < 100; i++) {
    const elemento = document.createElement("div");
    elemento.setAttribute("class", "item");
    elemento.setAttribute("id", "item" + i);
    elemento.setAttribute("onclick", "clique()");
    campo.appendChild(elemento);
    quadrados.push(elemento);

}

function clique() {
    alert("oi")
}
