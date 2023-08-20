let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldReset = false;

/* Operations */
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function percent(a) {
  return a / 100;
}

const clearBtn = document.querySelector("[data-ac]");
const deleteBtn = document.querySelector("[data-c]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const pointBtn = document.querySelector(".point");
const equalsBtn = document.querySelector(".equals");
const lastOperationDisplay = document.getElementById("lastOperationDisplay");
const currentOperationDisplay = document.getElementById(
  "currentOperationDisplay"
);

clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNum);
equalsBtn.addEventListener("click", evaluate);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => append(button.textContent))
);

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

function append(num) {
  if (currentOperationDisplay.textContent === "0" || shouldReset) {
    reset();
  }
  if (num === "." && currentOperationDisplay.textContent.includes(".")) return;
  currentOperationDisplay.textContent += num;
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate;
  firstOperand = currentOperationDisplay.textContent;
  currentOperation = operator;
  lastOperationDisplay.textContent = `${firstOperand} ${operator}`;
  shouldReset = true;
}

function evaluate() {
  if (currentOperation === null) return;
  secondOperand = currentOperationDisplay.textContent;

  currentOperationDisplay.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    case "%":
      return percent(a);
    default:
      return null;
  }
}

function reset() {
  currentOperationDisplay.textContent = "";
  shouldReset = false;
}

function deleteNum() {
  currentOperationDisplay.textContent =
    currentOperationDisplay.textContent.slice(0, -1);
}

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperationDisplay.textContent = "0";
  lastOperationDisplay.textContent = "";
  currentOperation = null;
}
