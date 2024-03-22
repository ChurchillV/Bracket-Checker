const { BracketChecker } = require('./bracket_checker');
const Tesseract = require('tesseract.js');

Tesseract.recognize('./images/test_image_4.png', 'eng', { logger: e => console.log(e) })
        .then((out) => {
            console.log(out);
            if(out.data.text) {
                console.log(BracketChecker.checkBrackets(out.data.text));
            }
});