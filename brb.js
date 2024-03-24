
//all contents in this file are in the ./bracket_checker.js file.
// this is the one i added to the class to make the ui interact better
import BracketChecker from "./bracket_checker.js";

var editableContent = document.getElementById('editableContent');

editableContent.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        var nonEditableContent = document.getElementById('nonEditableContent');
var lastNonEditableLine = nonEditableContent.querySelector('span:last-of-type');

var lineNumber = 1; // Default line number if no lines exist yet
if (lastNonEditableLine) {
    lineNumber = parseInt(lastNonEditableLine.textContent) + 1;
        var newp = document.createElement('span');
        newp.style.display = "block";
            newp.textContent = lineNumber; 
        document.getElementById('nonEditableContent').appendChild(newp)
    }
    }else if (event.key === 'Backspace' && document.getElementById('nonEditableContent').querySelector('span:last-of-type').textContent !== '1') {
        var nonEditableContent = document.getElementById('nonEditableContent');
        var lastNonEditableLine = nonEditableContent.querySelector('span:last-of-type');
        nonEditableContent.removeChild(lastNonEditableLine)
    }


});

window.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('keydown', preventBackspace);

    document.getElementById('editableContent').addEventListener('input', function() {
        document.removeEventListener('keydown', preventBackspace);
        var phrase = this.textContent;
        if (phrase.length > 0){
            var errorMessages = validateBrackets(phrase);
            displayErrorMessages(errorMessages);
        }
        
    });
});

function preventBackspace(event){
    if (event.key === 'Backspace'){
        event.preventDefault();
    }
}

//Iddriss' Code for on input errors
function validateBrackets(phrase) {
    var filteredPhrase = phrase.trim();
    var filteredPhrase = phrase.replace(/\s/g, '').replace(/[^()[\]{}]/g, '');

    var errorMessages = '';
    var stack = [];
    const openingBrackets = ['(', '[', '{'];
    const closingBrackets = [')', ']', '}'];

    console.log(filteredPhrase.length);
    for (var i = 0; i < filteredPhrase.length; i++) {
        const char = filteredPhrase[i];
        if (openingBrackets.includes(char)) {
            stack.push(filteredPhrase[i]);
        } else if (closingBrackets.includes(char)) {
            if (stack.length === 0) {
                errorMessages += 'Closing bracket without corresponding opening bracket at bracket position ' + (i);
            } else {
                var top = stack.pop();
                if ((phrase[i] === ')' && top !== '(') || (phrase[i] === ']' && top !== '[') || (phrase[i] === '}' && top !== '{')) {
                    errorMessages += 'Mismatched bracket at bracket position ' + (i + 1);
                }
            }
        }
    }
    if (stack.length > 0) {
       
        errorMessages += 'Unclosed bracket at bracket position ' + (i);
    } else {
        // errorMessages += 'Brackets balanced'
    }


    return errorMessages;
}

//display error messages on input
function displayErrorMessages(errorMessages) {
    var errorMessagesElement = document.getElementById('errorMessages');
    
    if (errorMessages !== '') {
        errorMessagesElement.innerHTML = errorMessages;
        errorMessagesElement.style.display = 'flex';
    } else {
        errorMessagesElement.style.display = 'none';
    }
}

//Display the error log when the run button is pressed
function runLog() {
    var logBox = document.getElementById('runLog');
    logBox.style.display = "flex";
    logBox.className = "ms-5 me-5"
    var errorLog = BracketChecker.checkBrackets(phrase);
    logBox.textContent = errorLog;
}

// export default runLog;
