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
	return y === 0 ? "NaN" : x / y;
}

function operate(x, y, op) {
	switch (op) {
		case "+":
			return add(x, y);
		case "-":
			return subtract(x, y);
		case "*":
			return multiply(x, y);
		case "/":
			return divide(x, y);
	}
}

function disable(buttons, condition) {
	buttons.forEach((button) => {
		button.disabled = condition;
	});
}

function updateDisplay(result) {
	if (result) display.textContent = String(result).substring(0, 7);
	else {
		let length = currentNumber.length;
		display.textContent = currentNumber.substring(length - 7, length);
	}
}

function addNumber(e) {
	if (numbers[0] && !operator) clear();
	let newNumber = e.target.id;
	currentNumber += newNumber;
	updateDisplay();
	disable([...operatorButtons, equalsButton], false);
}

function addOperator(e) {
	if (operator) equals();
	if (!numbers.length) {
		numbers.push(Number(currentNumber));
		currentNumber = "";
	}
	operator = e.target.id;
	disable([...operatorButtons, equalsButton], true);
	disable([...numberButtons], false);
}

function equals() {
	if (!operator) return;
	numbers.push(Number(currentNumber));
	currentNumber = "";
	let result = operate(numbers[0], numbers[1], operator);
	numbers = [result];
	operator = "";
	updateDisplay(result);
}

function clear() {
	currentNumber = "";
	numbers = [];
	operator = "";
	updateDisplay();
	disable([...operatorButtons, equalsButton], true);
}

let currentNumber = "";
let numbers = [];
let operator;

let display = document.querySelector("#display");
let operatorButtons = document.querySelectorAll(".operator");
let numberButtons = document.querySelectorAll(".number");
let equalsButton = document.querySelector(".equals");
let clearButton = document.querySelector(".clear");

numberButtons.forEach((button) => {
	button.addEventListener("click", (e) => addNumber(e));
});
operatorButtons.forEach((button) => {
	button.addEventListener("click", (e) => addOperator(e));
});
equalsButton.addEventListener("click", (_) => equals());
clearButton.addEventListener("click", (_) => clear());
