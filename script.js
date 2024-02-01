class Calculator {
    constructor(previousResultTextElement, currentResultTextElement) {
        this.previousResultTextElement = previousResultTextElement
        this.currentResultTextElement = currentResultTextElement
        this.clear()
    }

    clear() {
        this.previousResult = ""
        this.currentResult = ""
        this.operation = undefined
    }

    delete() {
        this.currentResult = this.currentResult.toString().slice(0,-1)
    }
    
    appendNumber(number) {
        if (number === "." && this.currentResult.includes(`.`)) return
        this.currentResult = this.currentResult.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentResult === ``) return
        if (this.previousResult !== ``) {
            this.compute()
        }
        this.operation = operation
        this.previousResult = this.currentResult
        this.currentResult = ``
    }

    compute() {
        let computation 
        const prev = parseFloat(this.previousResult)
        const current = parseFloat(this.currentResult)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
            break
            case '-':
                computation = prev - current
            break
            case '*':
                computation = prev * current
            break
            case '÷':
                computation = prev / current
            break
            case '%':
                computation = (prev * current)/100
            break
            default:
                return
        }
        this.currentResult = computation
        this.operation = undefined
        this.previousResult = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentResultTextElement.innerText = this.getDisplayNumber(this.currentResult)
        if(this.operation != null) {
            this.previousResultTextElement.innerText = 
                `${this.getDisplayNumber(this.previousResult)} ${this.operation}`
        }
        else{
            this.previousResultTextElement.innerText = ``
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all_clear]');
const previousResultTextElement = document.querySelector('[data-previous_result]');
const currentResultTextElement = document.querySelector('[data-current_result]');

const calculator = new Calculator (previousResultTextElement,currentResultTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
