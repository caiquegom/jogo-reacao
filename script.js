// ============================== START GAME ====================================
let numeroAnterior;
let intervalo = null;
let pontos = 0;
let difficultIndex = 0;
let velocidade;
const start = document.getElementById("start");
const countdown = document.getElementById('countdown')
const game = document.getElementById("main");
const blocos = document.getElementsByClassName("block");
const score = document.getElementById('score');
const tryAgain = document.getElementById('tryAgain');
const arrows = document.getElementsByTagName('img');
const difficultSelector = document.getElementById('difficultSelector');
const level = document.getElementById('level');


const dificuldades = [
    {nome: 'Fácil', cor: 'blue', velocidade: 700},
    {nome: 'Média', cor: 'orange', velocidade: 550},
    {nome: 'Difícil', cor: 'red', velocidade: 450}
]

function mudarDificuldade() {
    if (difficultIndex >= 0 && difficultIndex <= 2) {
        if (this == arrows[0]) {
            difficultIndex--;
        } else {
            difficultIndex++;
        }
    }

    if (difficultIndex == -1) {
        difficultIndex = 0;
    } else if (difficultIndex == 3) {
        difficultIndex = 2;
    }

    level.innerText = dificuldades[difficultIndex].nome;
    level.style.color = dificuldades[difficultIndex].cor;
    velocidade = dificuldades[difficultIndex].velocidade;
    console.log(velocidade)
}

for (let i = 0; i <= 1; i++) {
    arrows[i].addEventListener('click', mudarDificuldade)
}

function contagemRegressiva() {
    document.getElementById('countdownSFX').play();
    let segundosRestantes = 3;
    start.style.display = 'none';
    game.style.display = 'inline-block';
    difficultSelector.style.display = 'none';
    difficultSelector.style.marginTop = '50px';
    
    countdown.innerText = segundosRestantes;
    let contagem = setInterval(temporizador, 1000);
    function temporizador() {
        segundosRestantes--;
        countdown.innerText = segundosRestantes;
        if (segundosRestantes == 0) {
            clearInterval(contagem);
            countdown.innerText = '';
            iniciarJogo()
        }
    }
}

function iniciarJogo() {
    pontos = 0;
    
    for (let i = 0; i < blocos.length; i++) {
        blocos[i].addEventListener('click', verificaBloco);
    }
    
    intervalo = setInterval(escolheCor, velocidade);
}

start.addEventListener('click', contagemRegressiva);


// ============================== GAME WORKING ====================================

function resetaBlocos() {
    for (let i = 0; i < blocos.length; i++) {
        blocos[i].style.backgroundColor = 'black';
    }
}

function escolheCor() {
    let index;

    for (let i = 0; i < blocos.length; i++) {
        blocos[i].style.backgroundColor = 'black';
    }

    do {
        index = Math.floor((Math.random() * 9));
    } while (numeroAnterior == index);

    numeroAnterior = index;
    blocos[index].style.backgroundColor = 'red';
}

function verificaBloco() {
    if (this.style.backgroundColor == 'red') {
        document.getElementById('correctSFX').play();
        pontos++
        this.style.backgroundColor = 'black'
        score.innerText = `Pontuação: ${pontos}`;
    } else {
        fimDeJogo();
    }
}

// ============================== GAME OVER ====================================
function fimDeJogo() {
    document.getElementById('loseSFX').play();

    for (let i = 0; i < blocos.length; i++) {
        blocos[i].style.backgroundColor = 'red';
        blocos[i].removeEventListener('click', verificaBloco);
    }
    score.innerText += "\nVocê perdeu";
    clearInterval(intervalo);

    tryAgain.style.display = 'block';
    difficultSelector.style.display = 'block';
    difficultSelector.style.marginTop = '0';
}

function tentarNovamente() {
    tryAgain.style.display = 'none';

    for (let i = 0; i < blocos.length; i++) {
        blocos[i].style.backgroundColor = 'black';
    }

    score.innerText = 'Pontuação: 0';

    contagemRegressiva();
}

tryAgain.addEventListener('click', tentarNovamente);