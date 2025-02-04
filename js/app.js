console.log('Hello World!');

/*-------------------------------- Constants --------------------------------*/

const keys = [ // Keys for keyboard
    'Backspace',
    ...'qwertyuiop',
    ...'asdfghjkl',
    ...'zxcvbnm',
    'Enter',
];

const solution = ['hello', 'world', 'apple', 'peach', 'grape'][Math.floor(Math.random() * 5)]; 
//Randomly select a solution


console.log(solution);
//for testing

/*---------------------------- Variables (state) ----------------------------*/
currRow = 0;
currTile = 0;
currGuess = '';
//Current state

/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById('board'); //game board
const keyboard = document.getElementById('keyboard'); //keyboard
const restartButton = document.querySelector('#reset'); //restart button

/*-------------------------------- Functions --------------------------------*/

for (let i = 0; i < 6; i++) { //create rows of board
    for (let j = 0; j < 5; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-row', i);
        tile.setAttribute('data-col', j);
        board.appendChild(tile); //append to board
    }
}


handleClick = (e) => { //data key for the keyboard(click)
    const key = e.target.getAttribute('data-key');
    if (key === 'Enter') {
        checkGuess();
    } else if (key === 'Backspace') {
        removeLetter();
    } else {
        addLetter(key);
    }
}

keys.forEach((key) => { //create button El for each key on keyboard
    const keyEl = document.createElement('button');
    keyEl.classList.add('key');
    if (key === 'Enter' || key === 'Backspace') {
        keyEl.classList.add('large');
    }
    keyEl.textContent = key;
    keyEl.setAttribute('data-key', key); //set data attribute
    keyEl.addEventListener('click', handleClick) //listen for click
    keyboard.appendChild(keyEl); //append to keyboard
});


addLetter = (letter) => {
    if (currTile < 5) { //check if tile is empty
        const tile = document.querySelector(`.tile[data-row='${currRow}'][data-col='${currTile}']`); //get tile based on row and column
        tile.textContent = letter; //add letter to tile
        currGuess += letter; //add letter to guess
        currTile++; //move to next tile
    }
}


removeLetter = () => {
    if (currTile > 0) {
        currTile--; //move back one tile
        const tile = document.querySelector(`.tile[data-row='${currRow}"][data-col="${currTile}']`);
        tile.textContent = ''; //remove letter
        currGuess = currGuess.slice(0, -1); //remove last letter
    }
}

checkGuess = () => {
    if (currGuess.length !== 5) { //check if guess is 5 letters
        showMessage("More letters");
        return;
    }
    const solutionArray = solution.split(''); //split solution into array
    const guessArray = currGuess.split(''); //split guess into array

    guessArray.forEach((letter, index) => {
        const tile = document.querySelector(`.tile[data-row='${currRow}'][data-col='${index}']`); 
        if (solutionArray[index] === letter) { //check if letter is in the correct position
            tile.classList.add('correct');
            solutionArray[index] = null; //remove letter from solution array
        } else if (solutionArray.includes(letter)) {
            tile.classList.add('present');
            solutionArray[solutionArray.indexOf(letter)] = null; //remove letter from solution array
        } else {
            tile.classList.add('absent'); //letter is not in the solution
        }
    });


    if (currGuess === solution) { //check if guess is correct
        showMessage("You Win!");
        disableKeyboard();
        return;
    }

    if (currRow === 5) { //check if game is over
        showMessage(`"Game Over" '${solution}'.`);
        disableKeyboard();
        return;
    }

    currRow++; //move to next row
    currTile = 0;   //reset tile
    currGuess = ''; //reset guess
}

showMessage = (message) => {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;//show message
}

disableKeyboard = () => {
    document.querySelectorAll('.key').forEach((key) => {
        key.classList.add('disabled');     //disable keyboard
    });
};



/*----------------------------- Event Listeners -----------------------------*/

restartButton.addEventListener('click', () => {  //restart game
    location.reload();
});