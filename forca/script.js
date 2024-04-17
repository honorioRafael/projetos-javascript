letras = []
palavras = [['Animal', 'Onça'], ['Animal', 'Elefante'], ['Animal', "Leão"], ['Animal', "Baleia"],
            ['Pet', "Hamster"], ["Pet", 'Cachorro'], ['Comida', 'Batata'], ['Comida', "Lasanha"],
            ['Personagem', "Barba-Negra"]]
letras_c = []
vidas = 6
pode_palavra = false

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            inserirLetra()
        }
    });
});

function escolher() {
    letras_c = []
    letras = []
    vidas = 6
    pode_palavra = false
    mensagem.innerHTML = ''
    let letras_u = document.getElementById("letras")
    letras_u.innerHTML = ''

    palavra = palavras[Math.floor(Math.random() * palavras.length)]
    palavra[1] = palavra[1].toLowerCase();
    let tema = document.getElementById("tema")
    tema.innerHTML = `Dica: ${palavra[0]}`
    
    renderizarLetras()
    renderizarFoto()

    var input = document.getElementById("input")
    input.value = ''
    input.focus()
}

function inserirLetra() {
    var input = document.getElementById("input")
    if(input.value.length == 0) {
        CriarAlerta("Insira uma letra!")
    }
    else {
        if(pode_palavra && input.value.length > 1) {
            if(input.value.toLowerCase() == palavra[1].toLowerCase()) {
                Ganhar()
            }
            else {
                vidas = 0
                if(vidas <= 0) Ganhar(false)
            }
        }
        else {
            if(palavra[1].indexOf(input.value.toLowerCase()) == -1) {
                if(letras.indexOf(` ${input.value.toLowerCase()}`) == -1) {
                    // se não tem
                    letras.push(` ${input.value.toLowerCase()}`)

                    let letras_u = document.getElementById("letras")
                    letras_u.innerHTML = `${letras}`
                    vidas --;                  
                    renderizarFoto()
                    if(vidas <= 0) Ganhar(false)
                }
                else {
                    CriarAlerta("Você ja inseriu essa letra!")
                }
            }
            else {
                // se tem
                if(letras_c.indexOf(input.value.toLowerCase()) == -1) {
                    // não colocou ainda
                    letras_c.push(`${input.value.toLowerCase()}`)
                    renderizarLetras();
                }
                else {
                    // colocou
                    CriarAlerta("Você ja inseriu essa letra!")
                }
            }
            input.value = ''
            input.focus()
        }
    }
}

function renderizarLetras() {
    var txt = document.getElementById("palavra")
    var acertos = 0

    txt.innerHTML = '';
    for(var pos = 0; pos < palavra[1].length; pos++) {
        if(letras_c.includes(palavra[1][pos])) {
            txt.innerHTML += `${palavra[1][pos]} `
            acertos ++;
        }
        else txt.innerHTML += `_ `
    }

    if(acertos >= palavra[1].length / 2) {
        var mensagem = document.getElementById("mensagem")
        mensagem.innerHTML = ''
        mensagem.innerHTML = 'Caso saiba, você pode completar a palavra!'
        pode_palavra = true
    }

    if(acertos == palavra[1].length) {
        Ganhar()
    }
}

function renderizarFoto() {
    var img = document.getElementById("img")

    switch(vidas) {
        case 0: 
            img.src = "imagens/forca-6.png"
            break
        case 1: 
            img.src = "imagens/forca-5.png"
            break
        case 2: 
            img.src = "imagens/forca-4.png"
            break
        case 3: 
            img.src = "imagens/forca-3.png"
            break
        case 4: 
            img.src = "imagens/forca-2.png"
            break
        case 5: 
            img.src = "imagens/forca-1.png"
            break
        default: 
            img.src = "imagens/forca-0.png"
            break
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

function Ganhar(ganhou=true) {
    if(ganhou) CriarAlerta(`Você ganhou! A palavra era: ${palavra[1].toUpperCase()}`, true)
    else CriarAlerta(`Você perdeu! A palavra era: ${palavra[1].toUpperCase()}`)
    setTimeout(escolher, 2800)
}