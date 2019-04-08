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

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    }
}

function catcher(e) {
    let displayResult = document.querySelector('#result');
    let regexOperators = /[-+x÷]$/g; 

    if(displayResult.textContent.length == 11) {
        return;
    }

    if(e.target.value == 'C') {
        let displayResult = document.querySelector('#result');
        let displayNow = document.querySelector('#now');

        displayResult.textContent = '';
        displayNow.textContent = '';

        return;
    }

    if(e.target.value == '=') {
        let displayResult = document.querySelector('#result');
        let displayNow = document.querySelector('#now');

        if(regexOperators.test(displayResult.textContent)) {
            displayResult.textContent = displayResult.textContent.slice(0, displayResult.textContent.length - 2);
        }
        
        if(displayResult.textContent == '') {
            return;
        }



        let operator = displayNow.textContent.slice(displayNow.textContent.length - 1);
        displayNow.textContent = displayNow.textContent.slice(0, displayNow.textContent.length - 1);

        let num1 = displayNow.textContent;
        let num2 = displayResult.textContent;

        displayNow.textContent = num1 + operator + num2;

        console.log(operator);
        console.log(displayNow.textContent);
        console.log(operate(operator, displayNow.textContent, displayResult.textContent));
        displayResult.textContent = operate(operator, num1, num2);

        return;
    }

    if(regexOperators.test(displayResult.textContent)) {
        let displayNow = document.querySelector('#now');
        displayNow.textContent = displayNow.textContent + displayResult.textContent;
        displayResult.textContent = '';
    }

    displayResult.textContent = displayResult.textContent + e.target.value;
}

// COMO NULL

let buttons = Array.from(document.querySelectorAll('.btn'));

buttons.forEach((value) => {
    value.addEventListener('click', catcher);
});