
const display = document.getElementById("display");
let expression = "";

function updateDisplay() {
    display.value = expression || "0";
}

function addValue(value) {
    if (expression === "Error") {
        expression = "";
    }

    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    if (expression === "Error") {
        expression = "";
    } else {
        expression = expression.slice(0, -1);
    }

    updateDisplay();
}

function calculate() {
    if (!expression) return;

    try {
        // Allow only calculator characters.
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        // Evaluate the mathematical expression.
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(
            Number.parseFloat(result.toPrecision(12))
        );

        updateDisplay();
    } catch (error) {
        expression = "Error";
        updateDisplay();
    }
}
