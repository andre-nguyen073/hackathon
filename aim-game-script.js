const textElement = document.querySelectorAll('.text');
const countdownElement = document.getElementById('countdown');

let timeLeft = 10;

function startCountdown(){
    textElement.forEach(element => {
        element.style.display = 'none';
    });
    
}

document.addEventListener('click', () => {
    startCountdown();
});

