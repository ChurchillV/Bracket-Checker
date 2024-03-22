const openingBrackets = {
    "(" : ")",
    "{" : "}",
    "[" : "]"
};

const closingBrackets = {
    ")" : "(",
    "}" : "{",
    "]" : "["
};

function isOpeningBracket(bracket) {
    if(Object.keys(openingBrackets).includes(bracket)) {
        return true;
    }
    return false;
}

function isClosingBracket(bracket) {
    if(Object.keys(closingBrackets).includes(bracket)) {
        return true;
    }
    return false;
}

function completesBracket(openBracket, closeBracket) {
    if(openingBrackets[openBracket] == closeBracket) {
        return true;
    }
    return false;
}

function lint(input) {
    let bracketStack = [];
    for(let i = 0; i < input.length; i++) {
        console.table(bracketStack);
        if(isOpeningBracket(input[i])) {
            bracketStack.unshift({
                bracket : input[i],
                position : i
            });
        }

        if(isClosingBracket(input[i])) {
            if(bracketStack.length > 0 && completesBracket(bracketStack[0].bracket, input[i])) {
                console.log("bracket closed");
                bracketStack.shift();
                continue;
            }
            
            else if(bracketStack.length > 0 && !completesBracket(bracketStack[0].bracket, input[i])) {
                console.log(i);
                console.table(bracketStack);
                return `Unclosed Bracket \`${bracketStack[0].bracket}\` at position \"${bracketStack[0].position}\" `;
            }

            return `Error: Closing bracket \"${input[i]}\" at position \"${i}\" with no opening bracket`;
            }
        }

        if(bracketStack.length > 0) {
            return `Error : Bracket "${bracketStack[0].bracket}" at position "${bracketStack[0].position}" left unclosed`;
        } else {
            console.log("Everything's okay");
        }
    }

console.log(lint("{} var x : [contu]{}{}"));