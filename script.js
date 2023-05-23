// Set up variables
let playing = false;
let score;
let trialsLeft;
let step;
let action; // used for setInterval
const fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

// Get references to HTML elements and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const startResetBtn = document.querySelector('#startreset');
    const fruit1 = document.querySelector('#fruit1');
    const gameOver = document.querySelector('#gameOver');
    const scoreValue = document.querySelector('#scorevalue');
    const trialsLeftDiv = document.querySelector('#trialsLeft');
    const sliceSound = document.querySelector('#slicesound');
    const highscorevalue = document.querySelector('#highscorevalue');

    startResetBtn.addEventListener('click', () => {
        if (playing) {
            location.reload();
        } else {
            playing = true;
            score = 0;
            scoreValue.innerHTML = score;
            highscorevalue.innerHTML = localStorage.getItem('highScore')
            trialsLeftDiv.style.display = 'block';
            trialsLeft = 3;
            addHearts();

            gameOver.style.display = 'none';

            startResetBtn.innerHTML = 'Reset Game';

            startAction();
        }
    });

    fruit1.addEventListener('mouseover', () => {
        score++;
        scoreValue.innerHTML = score;
        sliceSound.play();
        clearInterval(action);
        //console.log("hi");
        $("#fruit1").hide("explode", 500); //slice fruit
        setTimeout(startAction, 500);
    });

    function addHearts() {
        const parent = document.getElementById('trialsLeft');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        for (i = 0; i < trialsLeft; i++) {
            parent.innerHTML += '<img src="./images/heart.png" class="life">';
        }
    }

    function startAction() {
        fruit1.style.display = 'block';
        chooseFruit();
        fruit1.style.left = Math.round(550 * Math.random()) + 'px';
        fruit1.style.top = '-50px';
        step = 1 + Math.round(5 * Math.random());
        action = setInterval(() => {
            fruit1.style.top = fruit1.offsetTop + step + 'px';
            if (fruit1.offsetTop > document.querySelector('#fruitsContainer').offsetHeight) {
                if (trialsLeft > 1) {
                    fruit1.style.display = 'block';
                    chooseFruit();
                    fruit1.style.left = Math.round(550 * Math.random()) + 'px';
                    fruit1.style.top = '-50px';
                    step = 1 + Math.round(5 * Math.random());
                    trialsLeft--;
                    addHearts();
                } else {
                    playing = false;
                    var highscore = localStorage.getItem("highScore");
                    if (highscore < score) {
                        localStorage.setItem("highScore", score);
                        startResetBtn.innerHTML = 'Start Game';
                        gameOver.style.display = 'block';
                        gameOver.innerHTML = `<p>Your score is highest score is ${score}</p>`;
                        trialsLeftDiv.style.display = 'none';
                    } else {
                        startResetBtn.innerHTML = 'Start Game';
                        gameOver.style.display = 'block';
                        gameOver.innerHTML = `<p>Game Over!</p><p>Your score is ${score}</p>`;
                        trialsLeftDiv.style.display = 'none';
                    }
                    stopAction();
                }
            }
        }, 10);
    }
    function chooseFruit() {
        const randomFruit = Math.floor(Math.random() * fruits.length);
        fruit1.setAttribute('src', `images/${fruits[randomFruit]}.png`);
    }
    function stopAction() {
        clearInterval(action);
        fruit1.style.display = 'none';
    }
});