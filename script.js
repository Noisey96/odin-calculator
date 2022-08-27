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

function addNumber(e) {
	let newNumber = e.target.id;
	currentNumber += newNumber;
	display.textContent += newNumber;
	disable([...operatorButtons, equalsButton], false);
}

function addOperator(e) {
	if (operator) equals();
	if (!numbers.length) {
		numbers.push(Number(currentNumber));
		currentNumber = "";
	}
	operator = e.target.id;
	display.textContent += operator;
	disable([...operatorButtons, equalsButton], true);
}

function equals() {
	if (!operator) return;
	numbers.push(Number(currentNumber));
	currentNumber = "";
	let result = operate(numbers[0], numbers[1], operator);
	numbers = [result];
	operator = "";
	display.textContent = String(result).substring(0, 7);
}

function clear() {
	currentNumber = "";
	numbers = [];
	operator = "";
	display.textContent = "";
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
