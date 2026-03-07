const campo = document.querySelector("#campo");

let quadrados = [];
let id = 0;

// cria os elementos na tela
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const elemento = document.createElement("div");
        elemento.setAttribute("class", "item");
        if (id < 10) {
            elemento.setAttribute("id", "item0" + id);
        } else {
            elemento.setAttribute("id", "item" + id);
        }
        elemento.setAttribute("onclick", "clique(" + i + "," + j + ")");
        campo.appendChild(elemento);
        quadrados.push(elemento);
        id++;
    }
}

const totalBombas = 25;
let quantidadeDeBombas = 0;
let bombasSorteadas = [];
let bombas = [[]];

// cria miniatura do campo
console.log(bombas)
function criarMatrizVazia() {
    for (let i = 0; i < 10; i++) {
        bombas[i] = new Array(10).fill(0);
    }
}
criarMatrizVazia();

// verifica se a posição aleatória já tem uma bomba ou não
function sortearBombas() {
    while (quantidadeDeBombas < totalBombas) {

        let linhaBomba = Math.floor(Math.random() * 9);
        let colunaBomba = Math.floor(Math.random() * 9);

        if (bombas[linhaBomba][colunaBomba] == 0) {
            bombas[linhaBomba][colunaBomba] = 1;

            quantidadeDeBombas++;
            bombasSorteadas.push(linhaBomba + "" + colunaBomba);
        }
    }
    // organizando bombas em ordem crescente
    bombasSorteadas.sort((a, b) => a - b);
}
console.log("Bombas:");
console.log(bombasSorteadas);
sortearBombas();

// verifica se o elemento clicado é bomba ou não
function clique(i, j) {
    // Linha 0, Coluna 5: (0 x 10) + 5 = 5
    // Linha 2, Coluna 3: (2 x 10) + 3 = 23
    const numeroElemento = (i * 10) + j;
    const elemento = campo.children[numeroElemento];
    console.log(i + ", " + j);
    if (bombas[i][j] == 1) {
        elemento.classList.add('explodido');
        alert("BOOM");
        elemento.classList.add('desativado');
        setTimeout(() => {
            alert("Game Over");
            location.reload();
        }, 100);
    } else {
        alert("Seguro");
        elemento.classList.add('seguro');
        elemento.classList.add('desativado');
    }
}
