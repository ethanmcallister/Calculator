let buttons = document.querySelector("#buttons");
let buttonElements = Array.from(buttons.getElementsByTagName("div"));

let textBox = document.querySelector("#top-window");

buttonElements.forEach(button => {
    // add click event listener to each button 
    button.addEventListener("click", handleClick);
});

let operandNumber = 0;
let firstOperand;
let operation;
let secondOperand;
let currentOperandString = "";
let currentOperandStringLength = 0;
let justClickedEnter = false;

function handleClick(event) {
    console.log(event.target.textContent);
    let buttonID = event.target.id;
    let buttonClass = event.target.className;

    processClick(buttonID, buttonClass);
}

function processClick(buttonID, buttonClass) {
    // if they clicked clear
    if (buttonID === "clear") { clearAll(); }

    // if they clicked equals
    if (buttonID === "equals" && operandNumber === 1) {
        secondOperand = Number(currentOperandString);
        let result = operate(firstOperand, operation, secondOperand);
        
        let roundedResult = roundResult(result);
        console.log(roundedResult);
        textBox.textContent = roundedResult;
        firstOperand = result;

        currentOperandString = "";
        currentOperandStringLength = 0;
        secondOperand = 0;
        justClickedEnter = true;
    }

    // if buttonID is a number, add the button id to the current button string
    if (buttonClass === "number") {

        // for dot:
        if (buttonID === "dot") {
            buttonID = ".";
        }

        currentOperandString += buttonID;
        currentOperandStringLength++;

        if (currentOperandStringLength <= 10) {
            textBox.textContent = currentOperandString;
        }
        justClickedEnter = false;
    }

    // if they clicked a operation symbol
    if (buttonClass === "operation") {
        if (operandNumber === 0) {
            firstOperand = Number(currentOperandString);
            currentOperandString = "";
            currentOperandStringLength = 0;
            operation = buttonID;
            operandNumber++;
        } else if (operandNumber === 1) {
            if (justClickedEnter) {
                operation = buttonID;
                currentOperandString = "";
                currentOperandStringLength = 0;
                return;
            } else {
                secondOperand = Number(currentOperandString);
                let result = operate(firstOperand, operation, secondOperand);
                firstOperand = result;
                let roundedResult = roundResult(result);
    
                console.clear();
                console.log(roundedResult);
                console.log(buttonID);
                textBox.textContent = roundedResult;

                operation = buttonID;
                currentOperandString = "";
                currentOperandStringLength = 0;
            }
        }  
    }

    if (buttonID === "reverse-sign") {
        if (currentOperandString[0] === '-') {
            currentOperandString = currentOperandString.slice(1);
            textBox.textContent = currentOperandString;
        } else {
            currentOperandString = "-" + currentOperandString;
            textBox.textContent = currentOperandString;
        }
    }
}

function operate(first, operation, second) {
    operandNumber = 1;
    
    if (operation === "plus") {
        let result = first + second;
        return result;
    } else if (operation === "subtract") {
        let result = first - second;
        return result;
    } else if (operation === "multiply") {
        let result = first * second;
        return result;
    } else if (operation === "divide") {
        if (second === 0) {
            return "Cannot divide by zero";
        }
        let result = first / second;
        return result;
    }
}

function clearAll() {
    operandNumber = 0;
    firstOperand = undefined;
    operation = undefined;
    secondOperand = undefined;
    currentOperandString = "";
    currentOperandStringLength = 0;
    textBox.textContent = "0";
}

// ensure result shows a max of 10 characters
function roundResult(num) {
    numString = num.toString();
    
    if (numString.length > 6) {
        const result = num.toPrecision(6);
        return result;        
    }
    return num;
}
