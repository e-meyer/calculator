let keys = Array.from(document.querySelectorAll('#key'))
let display = document.querySelector('.text')
let expression = document.querySelector('.expression')
let lastNumber = 0
let operation = false
let operationSelected = ''
const MAX_DISPLAY = 8;

const clearButton = document.querySelector('.clear')
clearButton.onclick = () => {
    clearAll()
}

const digits = Array.from(document.querySelectorAll('.digit'))
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if(hasDisplayLengthLimitReached()) 
            return
        if(digit.textContent.includes('.') && hasAlreadyAFloatingPoint())
            return;

        removePriorTextFromDisplay()

        display.innerText += digit.innerText 

        if(!operation)
            lastNumber = display.innerText

    })
})

const operators = Array.from(document.querySelectorAll('.operator'))
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(display.textContent == '')
            return
        checkOperator(operator)
    })
})

function clearAll() {
    resetDisplay()
    resetExpressionDisplay()
    resetDisplayAndVariables()
}

function resetDisplay() {
    display.innerText = '​'
}

function setDisplay(number) {
    display.innerText = number
}

function setOperator(string) {
    operationSelected = string
}

function resetExpressionDisplay() {
    expression.innerText = '​'
}

function setExpressionDisplay(string) {
    expression.innerText = string
}

function isOperationSelectedEmpty() {
    if(operationSelected == '')
        return true
    return false
}

function checkOperator(operator) {
    if(operator.innerText != '=' && display.innerText != '​') {                      // checks if the operator is not '=' and also if
                                                                                    // there is already a number in the display (!= '')
        operation = true                                                            // variable to stop storing numbers in lastNumber when pressing the digits

        if(isOperationSelectedEmpty()) {                                                // if the operationSelected hasn't been set yet, it means its the first time running the calculator
            setOperator(operator.textContent)                                       // so it won't use previous 
            setExpressionDisplay(lastNumber + ' ' + operationSelected)
            resetDisplay()
            return
        }
        lastNumber = calculateResult(operationSelected)
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber.toString() + ' ' + operationSelected)
        resetDisplay()
    }
    else if(operator.innerText == '='){
        let lastNumberHolder = lastNumber
        lastNumber = calculateResult(operationSelected)
        let numberToDisplay = checkDisplayAfterCalculation(lastNumber)
        setExpressionDisplay(`${lastNumberHolder} ${operationSelected} ${display.textContent} =`)
        setDisplay(numberToDisplay)
        resetDisplayAndVariables(numberToDisplay)
    } else {
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber + ' ' + operationSelected)
    }
}

function checkDisplayAfterCalculation(string) {
    if(string.toString().length > MAX_DISPLAY)
        return 'ERROR'
    if(string.toString().length > MAX_DISPLAY)
        return string.toString().slice(0, 9)
    return string
}

function resetDisplayAndVariables(number) {
    operation = false
    operationSelected = ''
    lastNumber = number
}

function hasDisplayLengthLimitReached() {
    if(display.textContent.length > MAX_DISPLAY)
        return true
    return false
}

function removePriorTextFromDisplay() {
    if(display.textContent == 'ERROR' || display.textContent == '​')
        setDisplay('')
    return
}

function hasAlreadyAFloatingPoint() {
    if(display.textContent.includes('.'))
        return true
    return false
}

function calculateResult(opClicked) {
    switch(opClicked){
        case '+':
            return parseFloat(lastNumber) + parseFloat(display.textContent)
            break;
        case '-':
            return parseFloat(lastNumber) - parseFloat(display.textContent)
            break;
        case 'x':
            return parseFloat(lastNumber) * parseFloat(display.textContent)
            break;
        case '/':
            return parseFloat(lastNumber) / parseFloat(display.textContent)
            break;
        default:
            break;
    }
}

// KEYBOARD LISTENER

// window.addEventListener('keydown', setKeyboardDigit)

// function setKeyboardDigit(e) {
//     const button = document.querySelector(`button[data-digit="${e.key}"]`);
//     if(!button) return

//     if(hasDisplayLengthLimitReached()) 
//         return
//     if(e.key == '.' && hasAlreadyAFloatingPoint())
//         return

//     removePriorTextFromDisplay()

//     display.innerText += e.key

//     if(!operation)
//         lastNumber = display.textContent

//     button.classList.add('pressed')
// }

// keys.forEach(key => key.addEventListener('transitionend', removeTransition))

// function removeTransition(e) {
//     if (e.propertyName !== 'transform') return;
//     e.target.classList.remove('pressed');
// }

// window.addEventListener('keydown', setKeyboardOperation)

// function setKeyboardOperation(e) {
//     if(display.textContent == '')
//         return

//     let button = document.querySelector(`button[data-key="${e.key}"]`);
//     if(!button) return

//     console.log(e.target.innerText)
//     console.log(display.textContent + 'fdp')
//     checkOperator(e.target)
    
// }
