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

function operate(operators, numbers) {
    const indexOfMultiply = [];
    const indexOfDivide = [];
    const indexOfAdd = [];
    const indexOfSubtract = [];

    let multiplyResults = [];
    let divideResults = [];
    let addResults = [];
    let subtractResults = [];

    operators.forEach((value, index) => {
        if(value == 'x') {
            indexOfMultiply.push(index);
        } else if(value == '÷') {
            indexOfDivide.push(index);
        } else if(value == '+') {
            indexOfAdd.push(index);
        } else if(value == '-') {
            indexOfSubtract.push(index);
        }
    });

    if(indexOfMultiply.length !== 0) {
        indexOfMultiply.forEach((value) => {
            let index1 = ((value + 1) * 2) - 2;
            let index2 = index1 + 1;

            multiplyResults.push(multiply(numbers[index1], numbers[index2]))

            numbers[index1] = null;
            numbers[index2] = null;
        });

        multiplyResults = multiplyResults.reduce((total, value) => {
            return total += value;
        });
    } 
    
    if(indexOfDivide.length !== 0) {
        indexOfDivide.forEach((value) => {
            let index1 = ((value + 1) * 2) - 2;
            let index2 = index1 + 1;

            divideResults.push(divide(numbers[index1], numbers[index2]))

            numbers[index1] = null;
            numbers[index2] = null;
        });

        divideResults = divideResults.reduce((total, value) => {
            return total + value;
        });
    }

    /*
    if(indexOfAdd.length !== 0) {
        indexOfAdd.forEach((value) => {
            let index1 = ((value + 1) * 2) - 2;
            let index2 = index1 + 1;

            addResults.push(add(numbers[index1], numbers[index2]))
        });

        addResults = addResults.reduce((total, value) => {
            return total + value;
        });
    }
    */

    if(indexOfSubtract.length !== 0) {
        indexOfSubtract.forEach((value) => {
            let index1 = ((value + 1) * 2) - 2;
            let index2 = index1 + 1;

            subtractResults.push(subtract(numbers[index1], numbers[index2]))

            numbers[index1] = null;
            numbers[index2] = null;
        });
        
        subtractResults = subtractResults.reduce((total, value) => {
            return total + value;
        });
    }

    addResults = numbers.reduce((total, value) => {
        if(value !== null) {
            return total + value;
        }
        return total + 0;
    });

    console.log(addResults);
    console.log(divideResults);
    console.log(multiplyResults);
    console.log(subtractResults);
    return addResults + divideResults + multiplyResults + subtractResults;
}

function catcher(e) {
}

let buttons = Array.from(document.querySelectorAll('.btn'));
buttons.forEach((value) => {
    value.addEventListener('click', catcher);
});