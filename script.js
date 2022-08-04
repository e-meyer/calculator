let digits = Array.from(document.querySelectorAll('.digit'))
let operators = Array.from(document.querySelectorAll('.operator'))
let display = document.querySelector('.text')
let lastNumber = 0
let secondNumber = 0
let operation = false
let operationClicked = ''

digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if(display.innerText.length > 8) 
            return
        if(digit.textContent.includes('.') && display.textContent.includes('.'))
            return;
        if(display.innerText == 0) 
            display.innerText = ''

        display.innerText += digit.innerText 

        if(!operation)
            lastNumber = display.innerText

        console.log(lastNumber)
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        
        if(operator.innerText != '='){
            operation = true
            display.innerText = 0
            operationClicked = operator.innerText
        }
        else{
            console.log(calculateResult(operationClicked))
            operation = false
            operationClicked = ''
            lastNumber = display.innerText
        }
        
    })
})

function calculateResult(opClicked) {
    switch(opClicked){
        case '+':
            display.innerText = parseFloat(lastNumber) + parseFloat(display.textContent)
            break;
        case '-':
            display.innerText = parseFloat(lastNumber) - parseFloat(display.textContent)
            break;
        case 'x':
            display.innerText = parseFloat(lastNumber) * parseFloat(display.textContent)
            break;
        case '/':
            display.innerText = parseFloat(lastNumber) / parseFloat(display.textContent)
            break;
        default:
            break;
    }

    let isABigNumber = checksDisplay(display.textContent)

    display.innerText = isABigNumber
}

function checksDisplay(string) {
    if(string.length > 8)
        return string.slice(0, 9)
    return string
}