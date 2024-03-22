// Bracket checker class implementation
class BracketChecker {
    
    // Methods and Data members are made static to allow them to be called without having to create a BracketChecker object

    // Hashmaps (Javascript Objects) for storing opening brackets(keys) and corresponding closing brackets(values)
    static openingBrackets = {
        "(" : ")",
        "{" : "}",
        "[" : "]"
    };
    
    // Hashmaps (Javascript Objects) for storing closing brackets(keys) and corresponding opening brackets(values)
    static closingBrackets = {
        ")" : "(",
        "}" : "{",
        "]" : "["
    };


    // Checks for opening brackets
    static isOpeningBracket(bracket) {
        if(Object.keys(this.openingBrackets).includes(bracket)) {
            return true;
        }
    return false;
    }


    // Checks for closing brackets
    static isClosingBracket(bracket) {
        if(Object.keys(this.closingBrackets).includes(bracket)) {
            return true;
        }
    return false;
    }


    // Checks whether a `closeBracket` completes a given `openBracket`
    static completesBracket(openBracket, closeBracket) {
            if(this.openingBrackets[openBracket] == closeBracket) {
                return true;
            }
        return false;
    }


    // Main Bracket checker algorithm
    static checkBrackets(input) {

        // Stack (Array) to keep track of encountered left parentheses
        const bracketStack = [];

        // Iterate through the input string
        for(let i = 0; i < input.length; i++) {

            // Print out the bracket stack at the start of each iteration
            console.table(bracketStack);

            // If an opening bracket (left parenthesis) is encountered, add it's type, and position to the bracket stack
            // NB: unshift is equivalent to a push operation for a  stack in javascript
            if(this.isOpeningBracket(input[i])) {
                bracketStack.unshift({
                    bracket : input[i],
                    position : i
                });
            }

            // If a closing bracket is encountered, perform the following checks and actions
            if(this.isClosingBracket(input[i])) {

                // If the stack is occupied and the closing bracket matches the opening bracket at the top of the stack:
                // 1 - Tell us that a bracket has been closed
                // 2 - Pop (shift) the bracket at the top of the stack
                // NB: shift is the equivalent of a pop operation for a stack in javascript
                if(bracketStack.length > 0 && this.completesBracket(bracketStack[0].bracket, input[i])) {
                    console.log("bracket closed");
                    bracketStack.shift();
                    continue;
                }
                
                // If the stack is occupied but the closing bracket doesn't match the opening bracket at the top of the stack:
                // 1 - Tell us that the bracket encountered doesn't match the bracket at the top of the bracket stack
                // 2 - Tell us the expected closing bracket
                else if(bracketStack.length > 0 && !this.completesBracket(bracketStack[0].bracket, input[i])) {
                    return `Bracket "${input[i]}" doesn't match unclosed Bracket \"${bracketStack[0].bracket}\" at position \"${bracketStack[0].position}\"\n
                    Expected a \"${this.openingBrackets[bracketStack[0].bracket]}\"`;
                }

                // Otherwise, if the closing bracket appears without any opening bracket in the bracket stack:
                // 1 - Tell us that a closing bracket with no corresponding opening bracket has been encountered
                // 2 - Suggest that the matching opening bracket should be present before it
                return `Error: Closing bracket \"${input[i]}\" at position \"${i}\" with no opening bracket\n
                        Expected a "${this.closingBrackets[input[i]]}" before it`;
                }
            }


            // At the end of our iteration, we check whether the bracket stack is empty or not

            // If it's not empty, it logs the bracket at the top of the bracket stack and it's position
            if(bracketStack.length > 0) {
                return `Error : Bracket "${bracketStack[0].bracket}" at position "${bracketStack[0].position}" left unclosed`;

            // Otherwise, it tells us that everything's okay
            } else {
                return "Everything's okay";
            }
    }
}

// console.log(BracketChecker.checkBrackets("]{} var x : [contu]{}{}"));
module.exports = { BracketChecker };