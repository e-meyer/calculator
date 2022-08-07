const expressionDisplay = document.querySelector('.expression')
const defaultDisplay = document.querySelector('.text')
const MAX_CHAR_DISPLAY = 7

let isFirstTime = true
let lastNumber = 0
let selectedOperator = ''

const add = (a, b) => a + b
const sub = (a, b) => a - b
const mult = (a, b) => a * b
const div = (a, b) => a / b

const digitsObj = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    '.': '.'
}

const operatorObj = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
}

const clearButton = document.querySelector('.clear')
clearButton.onclick = () => {
    clearAll()
}

const digits = Array.from(document.querySelectorAll('.digit'))

digits.forEach(digit => digit.addEventListener('click', (e) => {
    if(checkDisplayLength())
        return
    
    if(defaultDisplay.textContent.includes('​'))
        defaultDisplay.innerText = ''

    defaultDisplay.innerText += digit.textContent

}))

const operators = Array.from(document.querySelectorAll('.operator'))

operators.forEach(operator => operator.addEventListener('click', (e) => {
    if(isFirstTime && (operator.innerText == '=' || isDisplayClear()))
        return

    if(isFirstTime){
        isFirstTime = false
        setOperator(operator.textContent)
        setLastNumber(defaultDisplay.textContent)
        setExpressionDisplay(`${defaultDisplay.textContent} ${operator.textContent}`)
        clearDisplay()
        return
    }
    if(!isFirstTime && isDisplayClear()){
        setOperator(operator.textContent)
        setExpressionDisplay(`${lastNumber} ${operator.textContent}`)
        return
    }

    lastNumber = performCalculation(selectedOperator)
    setOperator(operator.textContent)
    setExpressionDisplay(`${lastNumber} ${operator.textContent}`)
    setDisplay(lastNumber)
}))

function checkDisplayLength() {
    if(defaultDisplay.textContent.toString().length > MAX_CHAR_DISPLAY)
        return true
    return false
}

function isDisplayClear() {
    if((defaultDisplay.textContent == '​' || defaultDisplay.textContent == '' || defaultDisplay.textContent == 'ERROR'))
        return true
    return false
}

function setExpressionDisplay(string) {
    expressionDisplay.textContent = string
}

function setOperator(operator){
    selectedOperator = operator
}

function setLastNumber(number) {
    lastNumber = number
}

function setDisplay(string) {
    if(defaultDisplay.textContent === '0' || defaultDisplay === 'ERROR'){
        defaultDisplay.innerText = ''
        setDisplay.innerText += string
        return
    }
    
    setDisplay.innerText += string
}

function clearAll() {
    lastNumber = 0
    isFirstTime = true
    clearDisplay()
}

function clearDisplay() {
    defaultDisplay.innerText = '​'
}

function performCalculation(selectedOperator) {
    switch(selectedOperator) {
        case '+':
            return add(parseFloat(lastNumber), parseFloat(defaultDisplay.textContent))
        case '-':
            return sub(parseFloat(lastNumber), parseFloat(defaultDisplay.textContent))
        case 'x':
            return mult(parseFloat(lastNumber), parseFloat(defaultDisplay.textContent))
        case '/':
            return div(parseFloat(lastNumber), parseFloat(defaultDisplay.textContent))
        default:
            return;
    }
}

