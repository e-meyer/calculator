let digits = Array.from(document.querySelectorAll('.digit'))
let operators = Array.from(document.querySelectorAll('.operator'))
let keys = Array.from(document.querySelectorAll('#key'))
let display = document.querySelector('.text')
let lastNumber = 0
let secondNumber = 0
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
        if(operator.innerText != '='){
            operation = true
            setDisplay('0')
            operationClicked = operator.innerText
        }
        else{
            calculateResult(operationClicked)
            let numberToDisplay = checkDisplayAfterCalculation(display.textContent)
            setDisplay(numberToDisplay)
            resetDisplayAndVariables()
        }
        
    })
})

function setDisplay(number) {
    display.innerText = number
}

function checkDisplayAfterCalculation(string) {
    if(string.length > 8)
        return string.slice(0, 9)
    return string
}

function resetDisplayAndVariables() {
    operation = false
    operationClicked = ''
    lastNumber = display.innerText
}

function hasDisplayLengthLimitReached() {
    if(display.textContent.length > 8)
        return true
    return false
}

function removeDummyTextFromDisplay() {
    if(display.textContent == 0)
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
            setDisplay(parseFloat(lastNumber) + parseFloat(display.textContent))
            break;
        case '-':
            setDisplay(parseFloat(lastNumber) - parseFloat(display.textContent))
            break;
        case 'x':
            setDisplay(parseFloat(lastNumber) * parseFloat(display.textContent))
            break;
        case '/':
            setDisplay(parseFloat(lastNumber) / parseFloat(display.textContent))
            break;
        default:
            break;
    }
}

// KEYBOARD LISTENER

window.addEventListener('keydown', setKeyboardOperation)

function setKeyboardOperation(e) {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    if(!button) return

    if(hasDisplayLengthLimitReached()) 
        return
    if(e.key == '.' && hasAlreadyAFloatingPoint())
        return

    removeDummyTextFromDisplay()

    if((!isNaN(e.key) || e.key === '.') && !operation){
        console.log("aq")
        display.innerText += e.key
        lastNumber = display.innerText
    }  else if (e.key != '=') {
        console.log("aq2")
        operation = true
        setDisplay = 0
        operationClicked = e.key
    } else {
        console.log("aq3")
        calculateResult(operationClicked)
        let numberToDisplay = checkDisplayAfterCalculation(display.textContent)
        setDisplay(numberToDisplay)
        resetDisplayAndVariables()
    }

    

    button.classList.add('pressed')
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition))

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pressed');
}