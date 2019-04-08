function add(num1, num2) {
    return Math.round((num1 + num2) * 100) / 100;
}

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 100) / 100;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 100) / 100;
}

function divide(num1, num2) {
    return Math.round((num1 / num2) * 100) / 100;
}

function operate(string) {
    const operators = searchOperators(string);

    string = string.split('+');

    for(b = 0; b < string.length; b++) {
        for(i = 0; i < operators.length; i++) {
            if(operators[i] === 'x' && /x/g.test(string[b])) {
                let indexX =  string[b].indexOf('x');
                let positionOfIndex = operators[i + 1] === operators[i] ? indexX + 1 : 1;
                let indexOfNextSign = string[b].indexOf(operators[i + 1], positionOfIndex);

                let num1 = Number(string[b].slice(0, indexX));
                let num2;

                if(indexOfNextSign === -1) {
                    num2 = Number(string[b].slice(indexX + 1));
                } else {
                    num2 = Number(string[b].slice(indexX + 1, indexOfNextSign));
                }

                let operation = num1 + operators[i] + num2;

                string[b] = string[b].replace(operation, multiply(num1, num2));
            } else if(operators[i] === '÷' && /÷/g.test(string[b])) {
                let indexDivide =  string[b].indexOf('÷');
                let positionOfIndex = operators[i + 1] === operators[i] ? indexDivide + 1 : 1;
                let indexOfNextSign = string[b].indexOf(operators[i + 1], positionOfIndex);

                let num1 = Number(string[b].slice(0, indexDivide));
                let num2;

                if(indexOfNextSign === -1) {
                    num2 = Number(string[b].slice(indexDivide + 1));
                } else {
                    num2 = Number(string[b].slice(indexDivide + 1, indexOfNextSign));
                }

                let operation = num1 + operators[i] + num2;

                string[b] = string[b].replace(operation, divide(num1, num2));
            } else if(operators[i] === '-' && /-/g.test(string[b])) {
                let indexSubtract =  string[b].indexOf('-');
                let positionOfIndex = operators[i + 1] === operators[i] ? indexSubtract + 1 : 1;
                let indexOfNextSign = string[b].indexOf(operators[i + 1], positionOfIndex);

                let num1 = Number(string[b].slice(0, indexSubtract));
                let num2;

                if(indexOfNextSign === -1) {
                    num2 = Number(string[b].slice(indexSubtract + 1));
                } else {
                    num2 = Number(string[b].slice(indexSubtract + 1, indexOfNextSign));
                }

                let operation = num1 + operators[i] + num2;

                string[b] = string[b].replace(operation, subtract(num1, num2));
            }
        }
    }

    return string.reduce((total, value) => Number(total) + Number(value));
}

function searchOperators(string) {
    operators = string.split(/[0-9]/g);

    operators = operators.filter((value) => {
        if(value === '+') {
            return false;
        } else if(value === '-' | value === '÷' | value === 'x') {
            return true;
        } else {
            return false;
        }
    });

    return operators
}

function displayWrite(string) {
    let displayNow = document.querySelector('#now');
    let displayResult = document.querySelector('#result');
    let displayBefore = document.querySelector('#before');
    let newResult = displayResult.textContent + string;
    let lastChar = newResult[newResult.length - 1];
    const regex = /[-x+÷]$/g;

    if(displayResult.textContent === '' && regex.test(string) && regex.test(displayNow.textContent)) {
        return;
    } 

    console.log(newResult[newResult.length - 1]);
    if(newResult[newResult.length - 1] === '.' && newResult[newResult.length -2] === '.') {
        return;
    }

    if (displayResult.getAttribute('status') === 'result' && regex.test(newResult) === false) {
        displayBefore.textContent = displayNow.textContent + '=' + newResult.slice(0, newResult.length - 1);

        displayNow.textContent = '';

        displayResult.textContent = string;
        displayResult.setAttribute('status', 'noresult');
        return
    }

    if(lastChar === '+' | lastChar === '-' | lastChar === 'x' | lastChar === '÷') {
        if(displayResult.textContent === '') {
            displayResult.textContent = string;
            return;
        } else if(displayResult.textContent === '+' | displayResult.textContent === '-' | displayResult.textContent === '÷' | displayResult.textContent === 'x') {
            return;
        }

        if(displayResult.getAttribute('status') === 'result') {
            displayBefore.textContent = displayNow.textContent + '=' + displayResult.textContent;

            displayNow.textContent = newResult;
            displayResult.textContent = '';

            displayResult.setAttribute('status', 'noresult');

            return;
        }

        displayNow.textContent = displayNow.textContent + newResult;
        newResult = '';
    } 

    displayResult.textContent = newResult;
}

function catcher(e) {
    let displayNow = document.querySelector('#now');
    let displayResult = document.querySelector('#result');
    let displayBefore = document.querySelector('#before');
    let operation = displayNow.textContent + displayResult.textContent;
    let result = operate(operation);
    let string = displayResult.textContent;

    switch(e.target.value) {
        case 'del':
            string = string.slice(0, string.length - 1);
            displayResult.textContent = string;
            return;
        case '%':
            return;
        case 'history':
            return;
        case 'C':
            if(displayResult.getAttribute('status') === 'result') {
                let actualResult = document.querySelector('#result');
                let actualNow = document.querySelector('#now');

                displayBefore.textContent = actualNow.textContent + '=' + actualResult.textContent;
                displayResult.textContent = '';
                displayNow.textContent = ''

                displayResult.setAttribute('status', 'noresult');
            }

            displayResult.textContent = '';
            displayNow.textContent = ''
            return;
        case '=':
            displayNow.textContent = operation;
            displayResult.textContent = result;

            displayResult.setAttribute('status', 'result');

            return;
        case undefined:
            string = string.slice(0, string.length - 1);
            displayResult.textContent = string;
            return;
    }

    if(string.length > 10) {
        return;
    } else {
        displayWrite(e.target.value);
    }
}

let buttons = Array.from(document.querySelectorAll('.btn'));
buttons.forEach((value) => {
    value.addEventListener('click', catcher);
});