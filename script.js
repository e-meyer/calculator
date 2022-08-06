let display = document.querySelector('.text')
let expression = document.querySelector('.expression')
let lastNumber = 0
let operationIsSelected = false
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

        if(!operationIsSelected)
            lastNumber = display.innerText

    })
})

const operators = Array.from(document.querySelectorAll('.operator'))
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(display.textContent == '')
            return
        if(display.textContent == 'ERROR')
            return
        checkOperator(operator)
    })
})

function checkOperator(operator) {
    if(isDisplayClean())
        return

    if(operator.innerText != '=' && display.innerText != '​') {
        operationIsSelected = true

        if(isOperationSelectedEmpty()) {
            setOperator(operator.textContent)                                       
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
        if(!operationIsSelected)
            return

        let lastNumberHolder = lastNumber
        lastNumber = calculateResult(operationSelected)
        let stringToDisplay = formatDisplayAfterCalculation(lastNumber)

        if(stringToDisplay == 'ERROR'){
            clearAll()
            setDisplay(stringToDisplay)
            return
        }

        setExpressionDisplay(`${lastNumberHolder} ${operationSelected} ${display.textContent} =`)
        setDisplay(stringToDisplay)
        resetVariables(stringToDisplay)
    } else {
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber + ' ' + operationSelected)
    }
}

function clearAll() {
    resetDisplay()
    resetExpressionDisplay()
    resetVariables()
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

function formatDisplayAfterCalculation(string) {
    if(Math.round(string).toString().length > MAX_DISPLAY)
        return 'ERROR'
    if(string.toString().length > MAX_DISPLAY)
        return string.toString().slice(0, 9)
    return string
}

function resetVariables(number) {
    operationIsSelected = false
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

function isDisplayClean() {
    if(display.textContent == '​' || display.textContent == 'ERROR')
        return true
    return false
}

function calculateResult(opClicked) {
    switch(opClicked){
        case '+':
            return parseFloat(lastNumber) + parseFloat(display.textContent)
        case '-':
            return parseFloat(lastNumber) - parseFloat(display.textContent)
        case 'x':
            return parseFloat(lastNumber) * parseFloat(display.textContent)
        case '/':
            return parseFloat(lastNumber) / parseFloat(display.textContent)
        default:
            break;
    }
}

// KEYBOARD LISTENER

window.addEventListener('keydown', setKeyboardDigit)

function setKeyboardDigit(e) {
    const button = document.querySelector(`button[data-digit="${e.key}"]`);
    if(!button) return

    if(hasDisplayLengthLimitReached()) 
        return
    if(e.key == '.' && hasAlreadyAFloatingPoint())
        return

    removePriorTextFromDisplay()

    display.innerText += e.key

    if(!operationIsSelected)
        lastNumber = display.textContent

    // button.classList.add('pressed')
}

// const keys = Array.from(document.querySelectorAll('#key'))

// keys.forEach(key => key.addEventListener('transitionend', removeTransition))

// function removeTransition(e) {
//     if (e.propertyName !== 'transform') return;
//     e.target.classList.remove('pressed');
// }

operators.forEach(operator => operator.addEventListener('keydown', setKeyboardOperation))

function setKeyboardOperation(e) {
    console.log('fdp')
    if(isDisplayClean())
        return

    let button = document.querySelector(`button[data-key="${e.key}"]`);
    if(!button) return

    checkOperator(button)
}
