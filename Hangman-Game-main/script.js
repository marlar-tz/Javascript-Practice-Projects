const wordEl = document.getElementById('word');
const hint = document.getElementById('hint');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const popupEl = document.getElementById('popup');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let words = [];
let wordArray = [];
let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];


// Random words generation
// Fetch from https://random-word-api.vercel.app/
async function generateRandomWord() {
    const res = await fetch('https://random-word-api.vercel.app/api?words=50');
    const data = await res.json();
    // console.log(data.toString()) ;
    data.forEach(word => {
        addData(word.toString());
    })

    selectedWord = words[Math.floor(Math.random() * words.length)];

    // Fetch definition of random word from another API
    // Fetch from https://dictionaryapi.dev/
    const res2 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`);
    const data2 = await res2.json();
    let meaning = data2[0].meanings[0].definitions[0].definition;
    hint.innerText = `Hint : ${meaning}`;

    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
            <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}
    `;

}

// Add random words to new list
function addData(word) {
    words.push(word);

}


// Show hidden word
async function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
            <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if ((selectedWord !== "") && (innerWord === selectedWord)) {
        finalMessage.innerText = `Congratulations ! You Won 🎉`;
        popup.style.display = 'flex';
        popupEl.classList.add('win');
    }
}

// Update the wrong letters
function updateWrongLettersEl() {

    // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>wrong:</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const error = wrongLetters.length;

        if (index < error) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    // Check if lost
    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'Oh no ! You lost the game 😢';
        popup.style.display = 'flex';
        popup.style.backgroundColor = '#34495e';
        popupEl.classList.add('lost');
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);

}

// Keydown letter press
window.addEventListener('keydown', e => {
    if ((e.key >= 'A' && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }

    }

});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    wrongLetters = [];
    correctLetters = [];
    words = [];
    selectedWord = '';


    generateRandomWord();
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
    popupEl.classList.remove('lost');
    popupEl.classList.remove('win');
})

generateRandomWord();
displayWord();
