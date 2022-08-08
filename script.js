let display = document.querySelector('.text')
let expression = document.querySelector('.expression')
let lastNumber = 0
let isFirstTime = true
let selectedOperator = ''
const MAX_DISPLAY = 8;

const add = (a, b) => a + b
const sub = (a, b) => a - b
const mult = (a, b) => a * b
const div = (a, b) => a / b

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

        if(!isDisplayClean())
            removePriorTextFromDisplay()

        display.innerText += digit.innerText 

        if(isFirstTime)
            lastNumber = display.innerText

    })
    
})

const operators = Array.from(document.querySelectorAll('.operator'))
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(display.textContent == '' && expression.textContent == '')
            return
        if(display.textContent == 'ERROR')
            return
        
        checkOperator(operator)

    })
})

function checkOperator(operator) {

    if(display.innerText == '​' && expression.textContent != '' && operator.textContent != '='){
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber + ' ' + selectedOperator)
        return
    }

    if(!isDisplayClean())
        return

    if(operator.innerText != '=' && display.innerText != '​') {
        isFirstTime = false
        
        if(isSelectedOperatorEmpty()) {
            setOperator(operator.textContent)                                       
            setExpressionDisplay(display.innerText + ' ' + selectedOperator)
            resetDisplay()
            return
        }

        lastNumber = performCalculation(selectedOperator)
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber.toString() + ' ' + selectedOperator)
        resetDisplay()
    }
    else if(operator.innerText == '='){
        
        if(isFirstTime)
            return
        
        let lastNumberHolder = lastNumber
        lastNumber = performCalculation(selectedOperator)
        let stringToDisplay = formatDisplayAfterCalculation(lastNumber)

        if(stringToDisplay == 'ERROR'){
            clearAll()
            setDisplay(stringToDisplay)
            return
        }
        setExpressionDisplay(`${lastNumberHolder} ${selectedOperator} ${display.textContent} =`)
        setDisplay(stringToDisplay)
        setOperator('')
        isFirstTime = true

    } else {
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber + ' ' + selectedOperator)
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
    selectedOperator = string
}

function resetExpressionDisplay() {
    expression.innerText = '​'
}

function setExpressionDisplay(string) {
    expression.innerText = string
}

function isSelectedOperatorEmpty() {
    if(selectedOperator == '')
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

function resetVariables() {
    isFirstTime = true
    selectedOperator = ''
    lastNumber = 0
}

function hasDisplayLengthLimitReached() {
    if(display.textContent.length > MAX_DISPLAY)
        return true
    return false
}

function hasAlreadyAFloatingPoint() {
    if(display.textContent.includes('.'))
        return true
    return false
}

function isDisplayClean() {
    if(display.textContent == '​' || display.textContent == 'ERROR')
        return false
    return true
}

function removePriorTextFromDisplay() {
    setDisplay('')
    return
}

function performCalculation(opClicked) {
    switch(opClicked){
        case '+':
            return add(parseFloat(lastNumber), parseFloat(display.textContent))
        case '-':
            return sub(parseFloat(lastNumber), parseFloat(display.textContent))
        case 'x':
            return mult(parseFloat(lastNumber), parseFloat(display.textContent))
        case '/':
            return div(parseFloat(lastNumber), parseFloat(display.textContent))
        default:
            break;
    }
}

// KEYBOARD LISTENER

window.addEventListener('keydown', setKeyboardDigit)

function setKeyboardDigit(e) {
    const button = document.querySelector(`button[data-digit="${e.key}"]`);
    if(!button) return

    button.click()

    button.classList.add('pressed')
}

window.addEventListener('keydown', setKeyboardOperation)

function setKeyboardOperation(e) {
    let button = document.querySelector(`button[data-key="${e.key}"]`);
    if(!button) return

    checkOperator(button)
}

// REMOVE ANIMATIONS AFTER KEYBOARD INPUT

const keys = Array.from(document.querySelectorAll('#key'))

keys.forEach(key => key.addEventListener('transitionend', (e) =>{
    if (e.propertyName !== 'transform') return;

    e.target.classList.remove('pressed');
}))

