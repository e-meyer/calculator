let digits = Array.from(document.querySelectorAll('.digit'))
let operators = Array.from(document.querySelectorAll('.operator'))
let keys = Array.from(document.querySelectorAll('#key'))
let display = document.querySelector('.text')
let expression = document.querySelector('.expression')
let lastNumber = 0
let operation = false
let operationClicked = ''

digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if(hasDisplayLengthLimitReached()) 
            return
        if(digit.textContent.includes('.') && hasAlreadyAFloatingPoint())
            return;

        removeDummyTextFromDisplay()

        display.innerText += digit.innerText 

        if(!operation)
            lastNumber = display.innerText

    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(display.textContent == '')
            return
        checkOperator(operator)
    })
})

function setDisplay(number) {
    display.innerText = number
}

function setOperator(string) {
    operationClicked = string
}

function setExpressionDisplay(string) {
    expression.innerText = string
}

function checkOperator(operator) {
    if(operator.innerText != '=' && display.innerText != '​') {
        operation = true
        if(operationClicked == '') {
            setOperator(operator.textContent)
            setExpressionDisplay(lastNumber + ' ' + operationClicked)
            setDisplay('​')
            return
        }
        lastNumber = calculateResult(operationClicked)
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber.toString() + ' ' + operationClicked)
        setDisplay('​')
    }
    else if(operator.innerText == '='){
        let lastNumberHolder = lastNumber
        lastNumber = calculateResult(operationClicked)
        let numberToDisplay = checkDisplayAfterCalculation(lastNumber)
        setExpressionDisplay(`${lastNumberHolder} ${operationClicked} ${display.textContent} =`)
        setDisplay(numberToDisplay)
        resetDisplayAndVariables(numberToDisplay)
    } else {
        setOperator(operator.textContent)
        setExpressionDisplay(lastNumber + ' ' + operationClicked)
    }
}

function setLastNumber() {

}

function checkDisplayAfterCalculation(string) {
    if(Math.round(string).toString().length > 8)
        return 'ERROR'
    if(string.toString().length > 8)
        return string.toString().slice(0, 9)
    return string
}

function resetDisplayAndVariables(number) {
    operation = false
    operationClicked = ''
    lastNumber = number
}

function hasDisplayLengthLimitReached() {
    if(display.textContent.length > 8)
        return true
    return false
}

function removeDummyTextFromDisplay() {
    if(display.textContent == 0 || display.textContent == 'ERROR' || display.textContent == '​')
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

//     removeDummyTextFromDisplay()

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
