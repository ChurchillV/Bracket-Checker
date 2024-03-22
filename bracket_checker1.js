var editableContent = document.getElementById("editableContent");

editableContent.addEventListener("keydown", function (event) {
    //create a new editable space
  if (event.key === "Enter") {
    var nonEditableContent = document.getElementById("nonEditableContent");
    var lastNonEditableLine =
      nonEditableContent.querySelector("span:last-of-type");

    var lineNumber = 1; // Default line number if no lines exist yet
    if (lastNonEditableLine) {
        //increment the line number
      lineNumber = parseInt(lastNonEditableLine.textContent) + 1;
      var newp = document.createElement("span");
      newp.style.display = "block";
      newp.textContent = lineNumber;
      document.getElementById("nonEditableContent").appendChild(newp);
    }
  } else if (
    //delete an existing editable space
    event.key === "Backspace" &&
    document
      .getElementById("nonEditableContent")
      .querySelector("span:last-of-type").textContent !== "1"
  ) {
    var nonEditableContent = document.getElementById("nonEditableContent");
    var lastNonEditableLine =
      nonEditableContent.querySelector("span:last-of-type");
    nonEditableContent.removeChild(lastNonEditableLine);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  //prevent the backspace event on load to prevent null values
  document.addEventListener("keydown", preventBackspace);

  document
    .getElementById("editableContent")
    .addEventListener("input", function () {
      //returns backsapce to normal function
      document.removeEventListener("keydown", preventBackspace);
      var phrase = this.textContent;
      if (phrase.length > 0) {
        var errorMessages = validateBrackets(phrase);
        displayErrorMessages(errorMessages);
      }
    });
});

function preventBackspace(event) {
  if (event.key === "Backspace") {
    event.preventDefault();
  }
}

//Iddriss' code
function validateBrackets(phrase) {
  var filteredPhrase = phrase.trim();
  var filteredPhrase = phrase.replace(/\s/g, "").replace(/[^()[\]{}]/g, "");

  var errorMessages = "";
  var stack = [];
  const openingBrackets = ["(", "[", "{"];
  const closingBrackets = [")", "]", "}"];

  console.log(filteredPhrase.length);
  for (var i = 0; i < filteredPhrase.length; i++) {
    const char = filteredPhrase[i];
    if (openingBrackets.includes(char)) {
      stack.push(filteredPhrase[i]);
    } else if (closingBrackets.includes(char)) {
      if (stack.length === 0) {
        errorMessages +=
          "Closing bracket without corresponding opening bracket at bracket position " +
          i;
      } else {
        var top = stack.pop();
        if (
          (phrase[i] === ")" && top !== "(") ||
          (phrase[i] === "]" && top !== "[") ||
          (phrase[i] === "}" && top !== "{")
        ) {
          errorMessages += "Mismatched bracket at bracket position " + (i + 1);
        }
      }
    }
  }
  if (stack.length > 0) {
    var stackValue = stack[stack.length - 1];

    // var stackComplete =
    //     stackValue === '{' ? '}' :
    //     stackValue === '(' ? ')' :
    //     stackValue === '[' ? ']' :
    //     '';

    errorMessages += "Unclosed bracket at bracket position " + i;
    // errorMessages += stackComplete + ' expected at bracket position ' + (i);
  } else {
    // errorMessages += 'Brackets balanced';
  }

  return errorMessages;
}

//Vince's code
// const openingBrackets = {
//     "(" : ")",
//     "{" : "}",
//     "[" : "]"
// };

// const closingBrackets = {
//     ")" : "(",
//     "}" : "{",
//     "]" : "["
// };

// function isOpeningBracket(bracket) {
//     if(Object.keys(openingBrackets).includes(bracket)) {
//         return true;
//     }
//     return false;
// }

// function isClosingBracket(bracket) {
//     if(Object.keys(closingBrackets).includes(bracket)) {
//         return true;
//     }
//     return false;
// }

// function completesBracket(openBracket, closeBracket) {
//     if(openingBrackets[openBracket] == closeBracket) {
//         return true;
//     }
//     return false;
// }

// function lint(input) {
//     var errorMessages = '';
//     const bracketStack = [];
//     for(let i = 0; i < input.length; i++) {
//         if(isOpeningBracket(input[i])) {
//             bracketStack.unshift({
//                 bracket : input[i],
//                 position : i
//             });
//         }

//         if(isClosingBracket(input[i])) {
//             if(bracketStack.length && completesBracket(bracketStack[0], input[i])) {
//                 errorMessages += "bracket closed";
//                 bracketStack.shift()
//             } else if(bracketStack.length && !completesBracket(bracketStack[0], input[i])) {
//                 errorMessages += `Unclosed Bracket \`${bracketStack[0].bracket}\` at position \"${bracketStack[0].position}\" `;
//             } else {
//                 errorMessages += `Error: Closing bracket \"${input[i]}\" at position \"${i}\" with no opening bracket`;
//             }
//         }
//     }
//     if(bracketStack.length > 0) {
//         errorMessages += "Error : Bracket left unclosed";
//         // console.log("Error : Bracket left unclosed");
//     } else {
//         errorMessages += "Everything's okay"
//         // console.log("Everything's okay");
//     }
//     return errorMessages;
// }

// console.log(lint("]{ var x : [contu}]"));

function displayErrorMessages(errorMessages) {
  var errorMessagesElement = document.getElementById("errorMessages");

  if (errorMessages !== "") {
    errorMessagesElement.innerHTML = errorMessages;
    errorMessagesElement.style.display = "flex";
  } else {
    errorMessagesElement.style.display = "none";
  }
}
