const display = document.querySelector('#display');
const operatorButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

let currentNumber = '';
let numbers = [];
let operator;

function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return y === 0 ? 'NaN' : x / y;
}

function operate(x, y, op) {
	switch (op) {
		case '+':
			return add(x, y);
		case '-':
			return subtract(x, y);
		case '*':
			return multiply(x, y);
		default:
			return divide(x, y);
	}
}

function disable(buttons, condition) {
	buttons.forEach((button) => {
		button.setAttribute('disabled', condition);
	});
}

function updateDisplay(result) {
	if (Number.isNaN(result)) display.textContent = 'NaN';
	else if (result) {
		const makeExp = Math.abs(result) > 99999999 || Math.abs(result) < 0.000001;
		display.textContent = makeExp ? result.toExponential(3) : String(result).substring(0, 9);
	} else {
		const { length } = currentNumber;
		display.textContent = currentNumber.substring(length - 9, length);
	}
	if (!display.textContent) display.textContent = 0;
}

function equals() {
	if (!operator) return;

	numbers.push(Number(currentNumber));
	currentNumber = '';

	const result = operate(numbers[0], numbers[1], operator);

	numbers = [result];
	operator = '';

	updateDisplay(result);

	disable([decimalButton], false);
}

function clear() {
	currentNumber = '';
	numbers = [];
	operator = '';

	updateDisplay();

	disable([decimalButton], false);
	disable([...operatorButtons, equalsButton], true);
}

function addNumber(e) {
	// if the number is added directly after it found a result, reset the calculator
	if (numbers.length === 1 && !operator) clear();

	const newNumber = e.target.id;
	currentNumber += newNumber;

	updateDisplay();

	disable([...operatorButtons, equalsButton], false);
	if (currentNumber.includes('.')) disable([decimalButton], true);
}

function addOperator(e) {
	// if the operator is added before a result is calculated, calculate a result
	if (operator) equals();

	if (!numbers.length) {
		numbers.push(Number(currentNumber));
		currentNumber = '';
	}
	operator = e.target.id;

	disable([...operatorButtons, equalsButton], true);
	disable([decimalButton], false);
}

numberButtons.forEach((button) => {
	button.addEventListener('click', (e) => addNumber(e));
});
operatorButtons.forEach((button) => {
	button.addEventListener('click', (e) => addOperator(e));
});
equalsButton.addEventListener('click', () => equals());
clearButton.addEventListener('click', () => clear());
