const campo = document.querySelector("#campo");

const totalBombas = 25;
let quantidadeDeBombas = 0;
let bombasSorteadas = [];
let quadrados = [];
let bombas = [[]];
let id = 0;

function verificarBombasEmVolta(linha, coluna) {

    // vendo se é uma bomba
    if (bombas[linha][coluna] == 1) {
        return; // encerra a verificação
    }

    let contador = 0;

    // percorre os 8 quadrados em volta
    for (let i = -1; i <= 1; i++) {
        /* 
        para linhas: 
        -1 = esquerda   0 = meio    -1 = direita
        */

        for (let j = -1; j <= 1; j++) {
            /* 
            para colunas: 
            -1 = cima
            0 = centro
            -1 = baixo
            */

            // Pega a sua linha atual e soma o passo
            let novaLinha = linha + i;
            //Pega a sua coluna atual e soma o passo
            let novaColuna = coluna + j;

            // vendo se os quadrados em volta estão dentro do campo
            if (novaLinha >= 0 && // não pode estar fora(cima)
                novaLinha < 9 && // não pode estar fora(baixo)
                novaColuna >= 0 && // não pode estar fora(esquerda)
                novaColuna < 9) { // não pode estar fora(direita)

                // adicionando contagem caso tenha bomba no espaço válido
                if (bombas[novaLinha][novaColuna] == 1) {
                    contador++;
                }
            }

        }
    }

    if (contador > 0) {
        // Exemplo: selecionando a div pela ID ou coordenada
        let quadrado = document.getElementById("item" + linha + coluna);
        quadrado.innerText = contador;
        // Adiciona uma classe de cor baseada no número (opcional)
        quadrado.classList.add("cor" + contador);
    }
}

function verificarEspacosEmVolta(linha, coluna) {

    if (bombas[linha][coluna] == 1) { return; }
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let novaLinha = linha + i;
            let novaColuna = coluna + j;

            if (novaLinha >= 0 && // não pode estar fora(cima)
                novaLinha < 9 && // não pode estar fora(baixo)
                novaColuna >= 0 && // não pode estar fora(esquerda)
                novaColuna < 9) { // não pode estar fora(direita)

                if (bombas[novaLinha][novaColuna] == 0) {

                }
            }

        }
    }
}

// cria os elementos na tela
for (let linha = 0; linha < 10; linha++) {
    for (let coluna = 0; coluna < 10; coluna++) {
        const elemento = document.createElement("div");
        elemento.setAttribute("class", "item");
        if (id < 10) {
            elemento.setAttribute("id", "item0" + id);
        } else {
            elemento.setAttribute("id", "item" + id);
        }
        elemento.setAttribute("onclick", "clique(" + linha + "," + coluna + ")");
        campo.appendChild(elemento);
        quadrados.push(elemento);
        id++;
    }
}



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

        // sorteando linha e coluna
        let linhaBomba = Math.floor(Math.random() * 9);
        let colunaBomba = Math.floor(Math.random() * 9);

        // verifica se já tem uma bomba
        if (bombas[linhaBomba][colunaBomba] == 0) {
            //se não tiver coloca uma
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
function clique(linha, coluna) {

    // Linha 0, Coluna 5: (0 x 10) + 5 = 5
    // Linha 2, Coluna 3: (2 x 10) + 3 = 23
    const numeroElemento = (linha * 10) + coluna;
    const elemento = campo.children[numeroElemento];

    console.log(linha + ", " + coluna);

    // se tiver uma bomba na posição...
    if (bombas[linha][coluna] == 1) {
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
    verificarBombasEmVolta(linha, coluna);
}
