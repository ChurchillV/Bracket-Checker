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
    const bracketStack = [];
    for(let i = 0; i < input.length; i++) {
        if(isOpeningBracket(input[i])) {
            bracketStack.unshift({
                bracket : input[i],
                position : i
            });
        }

        if(isClosingBracket(input[i])) {
            if(bracketStack.length && completesBracket(bracketStack[0], input[i])) {
                console.log("bracket closed");
                bracketStack.shift()
            } else if(bracketStack.length && !completesBracket(bracketStack[0], input[i])) {
                return `Unclosed Bracket \`${bracketStack[0].bracket}\` at postion \"${bracketStack[0].position}\" `;
            } else {
                return `Error: Closing bracket \"${input[i]}\" at postion \"${i}\" with no opening bracket`;
            }
        }
    }
    if(bracketStack.length > 0) {
        console.log("Error : Bracket left unclosed");
    } else {
        console.log("Everything's okay");
    }
}

console.log(lint("]{ var x : [contu}]"));