let buttons = document.querySelector("#buttons");
let buttonElements = Array.from(buttons.getElementsByTagName("div"));

let textBox = document.querySelector("#top-window");

buttonElements.forEach(button => {
    // add click event listener to each button 
    button.addEventListener("click", handleClick);
});

// initialize variables
let operandNumber = 0;
let firstOperand;
let operation;
let secondOperand;
let currentOperandString = "0";
let currentOperandStringLength = currentOperandString.length;
let justClickedEnter = false;
let justClickedOp = false;
let divideByZeroError = false;

function handleClick(event) {
    console.log(event.target.textContent);
    let buttonID = event.target.id;
    let buttonClass = event.target.className;

    processClick(buttonID, buttonClass);
}

function processClick(buttonID, buttonClass) {
    // make sure text size is xxx-large
    textBox.style.fontSize = "xxx-large";
    
    // if they clicked clear
    if (buttonID === "clear") { clearAll(); }

    // if they clicked equals
    if (buttonID === "equals" && operandNumber >= 1) {
        secondOperand = Number(currentOperandString);
        let result = operate(firstOperand, operation, secondOperand);
        let roundedResult = "";

        if (!divideByZeroError) {
            roundedResult = roundResult(result);
        } else { 
            roundedResult = result;
            clearAll();  // clear all info so user can immediately start a new calculation
        }

        console.log(roundedResult);

        // change font size if there is divide by zero error 
        if (divideByZeroError) {
            textBox.style.fontSize = "large";
        }

        textBox.textContent = roundedResult;
        firstOperand = result;

        currentOperandString = roundedResult;
        currentOperandStringLength = currentOperandString.length;
        secondOperand = 0;
        divideByZeroError = false;
        justClickedEnter = true;
        operandNumber = 0;

    }

    // if buttonID is a number, add the button id to the current button string
    if (buttonClass === "number") {

        if (justClickedOp) {
            currentOperandString = "";
            currentOperandStringLength = 0;
            operandNumber++;
        }

        // for dot:
        if (buttonID === "dot") {
            // ensure there is no more than 1 period in the currentOperandString
            let periodCount = 0;
            currentOperandString.split('').forEach((character) => {
                if (character === ".") { periodCount++; }
            });

            if (periodCount < 1) {
                buttonID = ".";
                currentOperandString += buttonID;
                currentOperandStringLength++;
            }
        }
        else {
            if (currentOperandStringLength === 1 && currentOperandString[0] === "0") {
                currentOperandString = buttonID;
                currentOperandStringLength++;
            } else {
                currentOperandString += buttonID;
                currentOperandStringLength++;
            }    
        }
        
        if (currentOperandStringLength <= 10) {
            textBox.textContent = currentOperandString;
        }

        justClickedEnter = false;
        justClickedOp = false;
    }

    // if they clicked an operation symbol
    if (buttonClass === "operation" && currentOperandString !== "") { 
    
        if (operandNumber === 0) {
            firstOperand = Number(currentOperandString);
            operation = buttonID;

        } else if (operandNumber === 1) {
            if (justClickedEnter) {
                operation = buttonID;
                return;
            } else {
                secondOperand = Number(currentOperandString);
                let result = operate(firstOperand, operation, secondOperand);                
                let roundedResult = roundResult(result);
    
                console.clear();
                console.log(roundedResult);
                console.log(buttonID);
                textBox.textContent = roundedResult;        

                firstOperand = result;
                operation = buttonID;
            }
        }
        justClickedOp = true;
    }

    if (buttonID === "reverse-sign") {
        if (justClickedOp) {
            return;
        }
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
            divideByZeroError = true;
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
    currentOperandString = "0";
    currentOperandStringLength = currentOperandString.length;
    textBox.textContent = "0";
    justClickedOp = false;
    justClickedEnter = false;
}

// ensure result shows a max of 8 characters
function roundResult(num) {
    let numString = num.toString();

    if (numString.length > 6) {
        numString = num.toPrecision(6);
    }
    
    return numString;  
}
