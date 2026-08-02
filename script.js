const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentValue;
}

function appendNumber(value) {
  if (currentValue === '0' || shouldResetDisplay) {
    currentValue = value;
    shouldResetDisplay = false;
  } else {
    currentValue += value;
  }

  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

function setOperator(nextOperator) {
  const value = parseFloat(currentValue);

  if (operator && !shouldResetDisplay) {
    calculate();
  }

  previousValue = value;
  operator = nextOperator;
  shouldResetDisplay = true;
  history.textContent = `${previousValue} ${operator}`;
}

function calculate() {
  const previous = previousValue;
  const current = parseFloat(currentValue);

  if (operator === null || Number.isNaN(previous) || Number.isNaN(current)) {
    return;
  }

  let result;
  switch (operator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
    case '%':
      result = previous % current;
      break;
    default:
      return;
  }

  currentValue = String(result);
  history.textContent = `${previous} ${operator} ${current} =`;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  shouldResetDisplay = false;
  history.textContent = '0';
  updateDisplay();
}

function deleteLast() {
  if (shouldResetDisplay) {
    currentValue = '0';
    shouldResetDisplay = false;
  } else if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }

  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (button.classList.contains('number')) {
      appendNumber(value);
      return;
    }

    if (button.classList.contains('clear')) {
      clearDisplay();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      return;
    }

    if (action === 'percent') {
      currentValue = String(parseFloat(currentValue) / 100);
      updateDisplay();
      return;
    }

    if (action === 'operator') {
      setOperator(value);
      return;
    }

    if (action === 'equals') {
      calculate();
    }
  });
});

updateDisplay();
