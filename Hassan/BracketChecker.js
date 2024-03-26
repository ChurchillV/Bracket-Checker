const { copyFileSync } = require("fs");

/**
 * @description This is the BracketChecker class.
 * Used to check a string to confirm if the brackets in the string
 * are all perfectly balanced.
 * @date 3/26/2024 - 2:45:18 AM
 *
 * @export
 * @class BracketChecker
 * @typedef {BracketChecker}
 */
class BracketChecker {
  constructor() {
    console.log('df');
  }


  /**
   * @description The opening brackets
   * @date 3/26/2024 - 2:44:38 AM
   *
   * @static
   * @type {{ '(': string; '{': string; '[': string; }}
   */
  static opening = {
    '(': ')',
    '{': '}',
    '[': ']',
  }


  /**
   * @description The closing brackets
   * @date 3/26/2024 - 2:46:37 AM
   *
   * @static
   * @type {{}}
   */
  static closing = {
    ')': '(',
    '}': '{',
    ']': '[',
  }


  /**
   * @description This function returns true if all the braces in a string
   * are balanced, and false otherwise.
   * @date 3/26/2024 - 2:47:59 AM
   *
   * @static
   * @param {string} str
   * @returns {boolean}
   */
  static isBalanced(str) {
    const stack = [];
    for (let char of str) {
      if (this.opening[char]) {
        // if the current character is an opening bracket,
        // add it to the stack.
        stack.push(char);
      } else if (this.closing[char]) {
        // if it is a closing bracket, compare it's closing bracket
        // to the top element of the stack
        const top = stack.pop();
        if (this.closing[char] !== top) {
          // if they don't match, then brackets are not balanced.
          return false;
        }
      }
    }
    // if stack is not empty, then there is an opening bracket
    // which was not closed, so return false, otherwise true.
    return stack.length === 0;
  }


  /**
   * @description This function finds the unbalanced bracket error
   * and returns it and it's index in the string, otherwise returns undefined
   * @date 3/26/2024 - 2:59:27 AM
   *
   * @static
   * @param {string} str
   * @returns {{char: string, type: 'closing' | 'opening', index: number}}
   */
  static findBracketErrorIndex(str) {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (this.opening[char]) {
        // if the current character is an opening bracket,
        // push it to the stack
        stack.push({ char, type: 'opening', index: i });
      } else if (this.closing[char]) {
        // if it is a closing bracket,
        // compare it to the top item of the stack
        const top = stack.pop();
        if (this.closing[char] !== top.char) {
          // if they don't match, then
          return { char, type: 'closing', index: i };
        }
      }
    }
    return stack.length === 0 ? stack[0] : undefined;
  }
}

module.exports = BracketChecker;
