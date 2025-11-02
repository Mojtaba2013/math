document.getElementById("solve-btn").addEventListener("click", function() {
  const input = document.getElementById("math-input").value;
  const outputDiv = document.getElementById("output");
  const stepsDiv = document.getElementById("steps");

  outputDiv.innerText = "";
  stepsDiv.innerHTML = "";

  try {
    const result = evaluateWithSteps(input, stepsDiv);
    outputDiv.innerText = "Result: " + result;
  } catch (e) {
    outputDiv.innerText = "Invalid math problem!";
  }
});

// Function to evaluate math expression step by step
function evaluateWithSteps(expr, container) {
  expr = expr.replace(/\s+/g, '');
  let steps = [];

  while (!/^\d+(\.\d+)?$/.test(expr)) {
    let parenMatch = expr.match(/\(([^()]+)\)/);
    if (parenMatch) {
      let subExpr = parenMatch[1];
      let subResult = simpleEval(subExpr);
      steps.push(`Evaluate (${subExpr}) = ${subResult}`);
      expr = expr.replace(`(${subExpr})`, subResult);
    } else {
      let opMatch = expr.match(/(\d+(\.\d+)?)([\*\/\+\-])(\d+(\.\d+)?)/);
      if (opMatch) {
        let [full, a,, op, b] = opMatch;
        let stepResult = simpleEval(`${a}${op}${b}`);
        steps.push(`Compute ${a} ${op} ${b} = ${stepResult}`);
        expr = expr.replace(full, stepResult);
      } else {
        break;
      }
    }
  }

  container.innerHTML = "<b>Steps:</b><br>" + steps.join("<br>");
  return parseFloat(expr);
}

function simpleEval(str) {
  return eval(str);
}
