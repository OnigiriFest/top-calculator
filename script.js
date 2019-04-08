function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
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
    let lastChar = displayResult.textContent[displayResult.textContent.length - 1];

    if (displayResult.getAttribute('status') === 'result' && /[-x+÷]$/g.test(displayResult.textContent) === false) {
        console.log('si entro');
        displayBefore.textContent = displayNow.textContent + '=' + displayResult.textContent.slice(0, displayResult.textContent.length);

        displayNow.textContent = '';
        displayResult.textContent = displayResult.textContent.slice(displayResult.textContent.length);

        displayResult.setAttribute('status', 'noresult');
        
        displayResult.textContent = displayResult.textContent + string;

        return
    }

    if(lastChar === '+' | lastChar === '-' | lastChar === 'x' | lastChar === '÷') {
        if(displayResult.getAttribute('status') === 'result') {
            console.log('si entro');
            displayBefore.textContent = displayNow.textContent + '=' + displayResult.textContent.slice(0, displayResult.textContent.length - 1);

            displayNow.textContent = displayResult.textContent;
            displayResult.textContent = '';

            displayResult.setAttribute('status', 'noresult');
        }

        displayNow.textContent = displayNow.textContent + displayResult.textContent;
        displayResult.textContent = '';
    } 

    displayResult.textContent = displayResult.textContent + string;
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
            if(displayNow.textContent === ''){
                displayResult.textContent = '';
                displayResult.setAttribute('status', 'noresult');
                return;
            }

            displayBefore.textContent = operation + '=' + result;
            displayNow.textContent = '';
            displayResult.textContent = '';
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

    displayWrite(e.target.value);
}

let buttons = Array.from(document.querySelectorAll('.btn'));
buttons.forEach((value) => {
    value.addEventListener('click', catcher);
});