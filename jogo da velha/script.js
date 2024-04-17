
quadrado = []
// 0 - elemento id
// 1 - player
// 2 - maquina
var pontos = 0
var seu_tempo = true
var timeout;

function onReady() {
    quadrado = []
    for(let i=0; i < 9; i++) {
        let id = document.getElementById(`jogo${i}`)
        quadrado.push([id, false, false])
    }
}

function restartGame() {
    seu_tempo = true
    for(let i=0; i < 9; i++) {
        quadrado[i][0].innerHTML = ''
        quadrado[i][1] = false
        quadrado[i][2] = false
    }
}

function showPontos() {
    let pont = document.getElementById("pontos")
    pont.innerHTML = ''
    pont.innerHTML = `Pontos: ${pontos}`
}

function game(numero) {
    if(quadrado[numero][1] == false && quadrado[numero][2] == false && seu_tempo) {
        quadrado[numero][0].innerHTML = ''
        quadrado[numero][0].innerHTML = 'X'
        quadrado[numero][1] = true

        let venceu = checkVictory()
        seu_tempo = false
        if(!venceu) timeout = setTimeout(maquinaJogar, 800)
    }
}

function maquinaJogar() {
    let slot = 0
    let livres = 9;
    for(let i = 0; i < 9; i++) {
        if(quadrado[i][1] == true || quadrado[i][2] == true) livres --;
    }
    if(livres == 0) return 1;
    while(true) {
        slot = Math.floor(Math.random() * 8)
        if(quadrado[slot][1] == false && quadrado[slot][2] == false) {
            quadrado[slot][0].innerHTML = ''
            quadrado[slot][0].innerHTML = 'O'
            quadrado[slot][2] = true

            checkVictory()
            seu_tempo = true
            break
        }
    }
}

function checkVictory() {
    if(quadrado[0][1] && quadrado[1][1] && quadrado[2][1] ||
        quadrado[3][1] && quadrado[4][1] && quadrado[5][1] ||
        quadrado[6][1] && quadrado[7][1] && quadrado[8][1] ||
        quadrado[0][1] && quadrado[4][1] && quadrado[8][1] ||
        quadrado[2][1] && quadrado[4][1] && quadrado[6][1] ||
        quadrado[0][1] && quadrado[3][1] && quadrado[6][1] ||
        quadrado[1][1] && quadrado[4][1] && quadrado[7][1] ||
        quadrado[2][1] && quadrado[5][1] && quadrado[8][1]) {
        
        CriarAlerta("Você venceu!", true);
        clearTimeout(timeout);
        setTimeout(restartGame, 2800);
        pontos++;
        showPontos()

        return true
    }
    else if(quadrado[0][2] && quadrado[1][2] && quadrado[2][2] ||
        quadrado[3][2] && quadrado[4][2] && quadrado[5][2] ||
        quadrado[6][2] && quadrado[7][2] && quadrado[8][2] ||
        quadrado[0][2] && quadrado[4][2] && quadrado[8][2] ||
        quadrado[2][2] && quadrado[4][2] && quadrado[6][2] ||
        quadrado[0][2] && quadrado[3][2] && quadrado[6][2] ||
        quadrado[1][2] && quadrado[4][2] && quadrado[7][2] ||
        quadrado[2][2] && quadrado[5][2] && quadrado[8][2]) {
        
        CriarAlerta("Você perdeu!");
        clearTimeout(timeout);
        setTimeout(restartGame, 2800);
    }
    else {
        let livres = 9;
        for(let i = 0; i < 9; i++) {
            if(quadrado[i][1] == true || quadrado[i][2] == true) livres --;
        }
        if(livres <= 0) {
            CriarAlerta("VELHA!");
            clearTimeout(timeout);
            setTimeout(restartGame, 2800);
        }
    }
}

function CriarAlerta(text, erro=false) {
    var body_ = document.getElementsByTagName("body")[0]
    let item = document.createElement("div")
    if(erro == true) {
        item.style.background = "#BDFCC9"
        item.style.borderColor = "#3A6F4C"
    }
    else {
        item.style.background = "#fcc8c8"
        item.style.borderColor = "#FF4D4D"
    }
    item.classList.add("alerta");
    item.innerHTML = `${text}`
    body_.appendChild(item)
    setTimeout(RemoverAlerta, 3000);
}

function RemoverAlerta() {
    let alerta = document.getElementsByClassName("alerta")[0]
    alerta.remove()
}