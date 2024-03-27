const { openStdin } = require("process");
const BracketChecker = require("../BracketChecker");

function generateBalancedString(bracketType = "(") {
  const opening = { "(": ")", "{": "}", "[": "]" };

  let str = "";
  let openings = 0;
  let closings = 0;
  while (true) {
    if (openings === 0 || Math.random() < 0.5) {
      str += bracketType;
      openings++;
    } else {
      str += opening[bracketType];
      // openings--;
      closings++;
    }
    if (openings === closings) break;
  }
  return str;
}


function generateUnbalancedString(minLen = 400, bracketType = "(") {
  const opening = { "(": ")", "{": "}", "[": "]" };
  let str = "";
  while (str.length < minLen) {

    console.log(bracketType, opening[bracketType]);
    str += Math.random() < 0.5 ? bracketType : opening[bracketType];
  }
  return str;
}

// Generate examples
const balancedParens = generateBalancedString("(");
const unbalancedParens = generateUnbalancedString(450, "(");
// const nestedBrackets = generateBracketString(400); // Nested brackets without specifying type

console.log("Balanced Parentheses:", balancedParens);
console.log('is it balanced: ', BracketChecker.isBalanced(balancedParens));
console.log("Unbalanced Parentheses:", unbalancedParens);
console.log('it it balanced:', BracketChecker.isBalanced(unbalancedParens));
// console.log("Nested Brackets:", nestedBrackets);
