const textElement = document.querySelectorAll('.text');
const countdownElement = document.getElementById('countdown');
const targetImage = document.getElementById('game_image');
const high_scoreElement = document.getElementById('high_score');
const scoreElement = document.getElementById('score');
const end_screenElement = document.getElementById('end_screen');
const button = document.querySelector("button");

let timeLeft = 10;
var high_score = 0;
var score = 0;
var width = window.innerWidth;
var height = window.innerHeight;

function moveImage(){
    const new_left = Math.floor(Math.random() * (width - targetImage.width));
    const new_top = Math.floor(Math.random() * (height - targetImage.height));
    
    targetImage.style.left = `${new_left}px`;
    targetImage.style.top = `${new_top}px`;
    score++;
    scoreElement.textContent = "Score: " + score;
}

function startGame(){
    targetImage.addEventListener('click', moveImage);
    textElement.forEach(function(element) {
        element.style.display = 'none';
    });
    high_scoreElement.style.display = 'block';
    scoreElement.style.display = 'block';
    targetImage.style.display = 'block';
    countdownElement.style.display = 'block';
    end_screenElement.style.display = 'none';
}
function endGame(){
    targetImage.removeEventListener('click', moveImage);
    if (score > high_score){
        high_score = score;
        high_scoreElement.textContent = "High Score: " + high_score;
    }
    score = 0;
    end_screenElement.style.display = 'flex';
    targetImage.style.display = 'none';
    countdownElement.style.display = 'none';
    timeLeft = 10;
    countdownElement.textContent = timeLeft;
    button.addEventListener('click', startCountdown);
}

function startCountdown(){
    const countdown = setInterval(function() {
        countdownElement.textContent = timeLeft;
        if (timeLeft == 0){
            clearInterval(countdown);
            countdownElement.textContent = timeLeft;
            endGame();
        } else{
            timeLeft--;
        }
    }, 1000);

    startGame();
}

document.addEventListener('click', startCountdown, { once: true});

