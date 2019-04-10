/* BODY SIZE */
let body = document.body;
    html = document.documentElement;

let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

body.style.height = height + 'px';


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
    if(num2 === 0) {
        return 'ERROR';
    }
    let result = num1 / num2;
    let string = result.toString();
    if(string.length > 15 && string[string.length - 1] === '5') {
        result = (Math.round(result * 100) / 100) + '5';
        result = Number(result);
    } else {
        result = Math.round(result * 100) / 100;
    }
    return result;
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
        } else if(value === '-' || value === '÷' || value === 'x') {
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

    if(/\./g.test(displayResult.textContent) && string === '.') {
        return;
    }

    if(displayResult.textContent === 'ERROR') {
        displayResult.textContent = '';
        displayNow.textContent = '';

        return;
    }

    if(displayResult.textContent === '' && regex.test(string) && regex.test(displayNow.textContent)) {
        return;
    } 

    if (displayResult.getAttribute('status') === 'result' && regex.test(newResult) === false) {
        displayBefore.textContent = displayNow.textContent + '=' + newResult.slice(0, newResult.length - 1);

        displayNow.textContent = '';

        displayResult.textContent = string;
        displayResult.setAttribute('status', 'noresult');
        return
    }

    if(lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
        if(displayResult.textContent === '') {
            displayResult.textContent = string;
            return;
        } else if(displayResult.textContent === '+' || displayResult.textContent === '-' || displayResult.textContent === '÷' || displayResult.textContent === 'x') {
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
    const regex = /[-x+÷]$/g;

    switch(e.target.value) {
        case 'letter':
            return;
        case 'del':
        case undefined:

            if(displayResult.textContent === '') {
                let stringNow = displayNow.textContent;
                stringNow = stringNow.slice(0, stringNow.length - 1);
                displayNow.textContent = stringNow;

                return;
            }

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
            if(regex.test(displayNow.textContent) && displayResult.textContent === '') {
                return;
            }

            if(displayResult.getAttribute('status') === 'result') {
                return;
            }

            displayNow.textContent = operation;
            displayResult.textContent = result;

            displayResult.setAttribute('status', 'result');

            return;
    }

    if(string.length > 10 && !/[÷+x-]/.test(e.target.value)) {
        return;
    } else {
        displayWrite(e.target.value);
    }
}

document.addEventListener('keydown', (e) => {
    let buttons = document.querySelectorAll('.btn');

    buttons.forEach((value) => {
        if(value.value === '.' && e.key === '.') {
            e.target.value = value.value;
            catcher(e);
            return
        } else if(value.value === e.key) {
            e.target.value = value.value;
            catcher(e);
        } else if(e.key === '*' && value.value === 'x') {
            e.target.value = value.value;
            catcher(e);
        } else if(e.key === '/' && value.value === '÷') {
            e.target.value = value.value;
            catcher(e);
        } else if(e.key === 'Backspace' && value.value === 'del') {
            e.target.value = value.value;
            catcher(e);
        } else if(e.key === 'Enter' && value.value === '=') {
            e.target.value = value.value;
            catcher(e);
        } else if(!/[0-9]/.test(e.key)) {
            e.target.value = 'letter';
            catcher(e);
        }
    });
});

let buttons = Array.from(document.querySelectorAll('.btn'));
buttons.forEach((value) => {
    value.addEventListener('click', catcher);
});