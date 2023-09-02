document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    const historyList = document.getElementById('history-list');
    const historyDiv = document.getElementById('history');

    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
    let history = [];
    let historyVisible = false; // Track if history is visible

    // Function to update the display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Event listeners for number buttons
    buttons.forEach(button => {
        if (button.classList.contains('number')) {
            button.addEventListener('click', function () {
                currentInput += this.textContent;
                updateDisplay();
            });
        }
    });

    // Event listeners for operator buttons
    buttons.forEach(button => {
        if (button.classList.contains('operator')) {
            button.addEventListener('click', function () {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        performCalculation();
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    currentOperator = this.textContent;
                }
            });
        }
    });

    // Event listener for equals button
    document.querySelector('.equals').addEventListener('click', function () {
        if (currentInput !== '' && previousInput !== '') {
            performCalculation();
            currentOperator = '';
        }
    });

    // Event listener for clear button
    document.querySelector('.clear').addEventListener('click', function () {
        currentInput = '';
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    });

    // Event listener for history button
    document.querySelector('.history').addEventListener('click', function () {
        historyVisible = !historyVisible;
        historyDiv.style.display = historyVisible ? 'block' : 'none';
    });

    // Function to perform the calculation
    function performCalculation() {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;
        switch (currentOperator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    result = 'Error';
                }
                break;
        }
        if (result !== undefined) {
            currentInput = result.toString();
            history.unshift(`${previousInput} ${currentOperator} ${num2} = ${currentInput}`);
            updateHistory();
            previousInput = currentInput;
            currentInput = '';
            updateDisplay();
        }
    }

    // Function to update the calculation history
    function updateHistory() {
        historyList.innerHTML = '';
        history.slice(0, 5).forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }
});
