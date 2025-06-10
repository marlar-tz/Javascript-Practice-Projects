'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.guess').value = '';

const display = function (className, message) {
    document.querySelector(`.${className}`).textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    // When there is no input
    if (!guess) {
        display('message', 'No number!');

        // When player wins
    } else if (guess === secretNumber) {
        display('message', 'Correct Number!');
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        // set the highscore
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

    }

    // When guess is wrong
    else if (guess !== secretNumber) {
        if (score > 1) {
            display('message', guess > secretNumber ? 'Too high!' : 'Too low!')
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            display('message', 'you lost the game!');
            document.querySelector('.score').textContent = 0;
            document.querySelector('body').style.backgroundColor = 'rgb(131, 9, 9)';
        }
    }
});

// reset the game
document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    display('message', 'Start guessing...');
    display('number', '?');
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});


