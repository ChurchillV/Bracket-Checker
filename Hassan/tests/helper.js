const { log } = require("console");

const generateBalancedBrackets = (minLen = 400, bracketType='') => {
    const closing = {
        ')': '(',
        '}': '{',
        ']': '[',
      }
    const opening = {
        '(': ')',
        '{': '}',
        '[': ']',
      }

    const str = '';
    for (let i = 0; i < minLen; i++) {
     if (bracketType) {
        log(i--);
     }
     log(i);
    }
}
