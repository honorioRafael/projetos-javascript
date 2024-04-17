snake = []
var move = 'idle'
apple = []
var pontos = 0

const WIDTH = 500 // X
const HEIGHT = 500 // Y
const SPEED = 70 
const SNAKE_SIZE = 20

function startGame(timeout=true) {
    snake = []
    snake.push([Math.floor(Math.random() * (WIDTH / SNAKE_SIZE)) * SNAKE_SIZE, Math.floor(Math.random() * (HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE, 'idle'])

    renderSnake()
    genApple() 
    ExibirPontos()
    if(timeout) setTimeout(moveSnake, SPEED)
}

function restartGame() {
    pontos = 0
    move = 'idle'

    for(pos in snake) {
        let cobra = document.getElementById(`snake_${pos}`)
        if(cobra !== null) cobra.remove()
    }
 
    startGame(false)
}

function genApple() {
    let maca = document.getElementById("apple")
    if(maca !== null) maca.remove()

    let rarity = Math.floor(Math.random() * 10)
    if(rarity != 1) rarity = 0

    while(true) {
        apple = [Math.floor(Math.random() * (WIDTH / SNAKE_SIZE)) * SNAKE_SIZE, Math.floor(Math.random() * (HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE, rarity]
        if(snake.indexOf(apple[0]) == -1 && snake.indexOf(apple[1]) == -1) {
            break
        }
    }

    let game = document.getElementById("game")
    let item = document.createElement("div")
    item.classList.add("apple");     
    if(rarity == 1) item.style.backgroundColor = 'gold'
    item.id = 'apple'
    game.appendChild(item)
    item.style.left = (apple[0] + game.offsetLeft) + 'px';
    item.style.top = (apple[1] + game.offsetTop) + 'px';
}

function renderSnake() {
    let game = document.getElementById("game")
    for(pos in snake) {
        let cobra = document.getElementById(`snake_${pos}`)
        if(cobra === null) {
            let item = document.createElement("div")
            item.id = `snake_` + pos
            item.classList.add("snake");     
            game.appendChild(item)
            // if(pos == 0) item.style.backgroundColor = 'green' 
            item.style.left = (snake[pos][0] + game.offsetLeft) + 'px';
            item.style.top = (snake[pos][1] + game.offsetTop) + 'px';        
        }
        else {
            cobra.style.left = (snake[pos][0] + game.offsetLeft) + 'px';
            cobra.style.top = (snake[pos][1] + game.offsetTop) + 'px'; 
        }       
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if(event.key === 'w' || event.key === 'ArrowUp') {
            if(snake.length > 1) { if(snake[1][1] != snake[0][1] -SNAKE_SIZE) move = 'up' }
            else move = 'up'
        }
        else if(event.key === 'a' || event.key === 'ArrowLeft') {
            if(snake.length > 1) { if(snake[1][0] != snake[0][0] -SNAKE_SIZE) move = 'left' }
            else move = 'left'
        }
        else if(event.key === 's' || event.key === 'ArrowDown') {
            if(snake.length > 1) { if(snake[1][1] != snake[0][1] +SNAKE_SIZE) move = 'bottom' }
            else move = 'bottom'
        }
        else if(event.key === 'd' || event.key === 'ArrowRight') {
            if(snake.length > 1) { if(snake[1][0] != snake[0][0] +SNAKE_SIZE) move = 'right' }
            else move = 'right'
        }
        else if(event.key == 32 || event.key === 'Escape') {
            move = 'idle'
        }
    });
});

function moveSnake() {
    if(move !== 'idle') {
        for(let pos = snake.length-1; pos > 0; pos --) {     
            snake[pos][0] = snake[pos-1][0]
            snake[pos][1] = snake[pos-1][1]
            snake[pos][2] = snake[pos-1][2]
        }

        snake[0][2] = move
        if(move == 'left') snake[0][0] -= SNAKE_SIZE
        if(move == 'right') snake[0][0] += SNAKE_SIZE
        if(move == 'up') snake[0][1] -= SNAKE_SIZE
        if(move == 'bottom') snake[0][1] += SNAKE_SIZE

        if(snake[0][0] == apple[0] && snake[0][1] == apple[1]) {
            pontos ++;
            if(apple[2] == 1) pontos ++;
            ExibirPontos()
            switch(snake[snake.length-1][2]) {
                case 'left': {
                    snake.push([snake[snake.length-1][0]+SNAKE_SIZE, snake[snake.length-1][1], snake[snake.length-1][2]])
                    if(apple[2] == 1) snake.push([snake[snake.length-1][0]+SNAKE_SIZE, snake[snake.length-1][1], snake[snake.length-1][2]])
                    break
                }
                case 'right': {
                    snake.push([snake[snake.length-1][0]-SNAKE_SIZE, snake[snake.length-1][1], snake[snake.length-1][2]])
                    if(apple[2] == 1) snake.push([snake[snake.length-1][0]-SNAKE_SIZE, snake[snake.length-1][1], snake[snake.length-1][2]])
                    break
                }
                case 'up': {
                    snake.push([snake[snake.length-1][0], snake[snake.length-1][1]+SNAKE_SIZE, snake[snake.length-1][2]])
                    if(apple[2] == 1) snake.push([snake[snake.length-1][0], snake[snake.length-1][1]+SNAKE_SIZE, snake[snake.length-1][2]])
                    break
                }
                case 'bottom': {
                    snake.push([snake[snake.length-1][0], snake[snake.length-1][1]-SNAKE_SIZE, snake[snake.length-1][2]])
                    if(apple[2] == 1) snake.push([snake[snake.length-1][0], snake[snake.length-1][1]-SNAKE_SIZE, snake[snake.length-1][2]])
                    break
                }
            } 

            genApple()
        }
    }

    renderSnake() 
    if(snake[0][0] >= 500 || snake[0][0] < 0 || snake[0][1] >= 500 || snake[0][1] < 0) {
        restartGame()
    }

    setTimeout(moveSnake, SPEED)
}

function ExibirPontos() {
    var pts = document.getElementById("pontos")
    pts.innerHTML = ''
    pts.innerHTML = `Pontos: ${pontos}`
}