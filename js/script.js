const campo = document.querySelector("#campo");

let quadrados = [];
for (let i = 0; i < 100; i++) {
    const elemento = document.createElement("div");
    elemento.setAttribute("class", "item");
    elemento.setAttribute("id", "item" + i);
    elemento.setAttribute("onclick", "clique(" + i + ")");
    campo.appendChild(elemento);
    quadrados.push(elemento);

}
let bombas = [];
function sortearBombas() {
    while (bombas.length <= 24) {
        let bomba = Math.floor(Math.random() * (100 - 0));
        if (!bombas.includes(bomba)) {
            bombas.push(bomba);
        }
    }
    // organizando em ordem crescente
    bombas.sort((a, b) => a - b);
}


sortearBombas();

console.log(bombas)

function clique(i) {
    if (bombas.includes(i)) {
        alert("BOOM")
    } else {
        alert("Seguro")
    }
}
