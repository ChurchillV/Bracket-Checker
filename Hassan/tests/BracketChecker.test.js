const { describe, it } = require('node:test');
const assert = require('node:assert');
const BracketChecker = require('../BracketChecker');

describe('Testing "BracketChecker.isBalanced()"', () => {

  describe('Testing without brackets', () => {

    it('should return true for "Hello World"', () => {
      assert.equal(BracketChecker.isBalanced('Hello World'), true);
    });
  });

  describe('Testing "()" brackets', () => {

    it('should return true for ()', () => {
      assert.equal(BracketChecker.isBalanced('()'), true);
    });

    it('should return false for )(', () => {
      assert.equal(BracketChecker.isBalanced(')('), false);
    });

    it('should return true for ()()((()()))()', () => {
      assert.equal(BracketChecker.isBalanced('()()((()()))()'), true);
    });

    it('should return false for ()(()(()()', () => {
      assert.equal(BracketChecker.isBalanced('()(()(()()'), false);
    });
  });

  describe('Testing "{}" brackets', () => {

      it('should return true for {}', () => {
        assert.equal(BracketChecker.isBalanced('{}'), true);
      });

      it('should return false for }{', () => {
        assert.equal(BracketChecker.isBalanced('}{'), false);
      });

      it('should return true for {}{}{}{}{}', () => {
        assert.equal(BracketChecker.isBalanced('{}{}{}{}{}'), true);
      });

      it('should return false for {}{{}{{}{}', () => {
        assert.equal(BracketChecker.isBalanced('{}{{}{{}{}'), false);
      });
    });

    describe('Testing "[]" brackets', () => {

      it('should return true for []', () => {
        assert.equal(BracketChecker.isBalanced('[]'), true);
      });

      it('should return false for ][', () => {
        assert.equal(BracketChecker.isBalanced(']['), false);
      });

      it('should return true for [][][][][]', () => {
        assert.equal(BracketChecker.isBalanced('[][][][][]'), true);
      });

      it('should return false for [][[][[][]', () => {
        assert.equal(BracketChecker.isBalanced('[][[][[][]'), false);
      });
    });

    describe('Testing "<>" brackets', () => {

      it('should return true for <>', () => {
        assert.equal(BracketChecker.isBalanced('<>'), true);
      });

      it('should return false for ><', () => {
        assert.equal(BracketChecker.isBalanced('><'), false);
      });

      it('should return true for <><><<<><>>><>', () => {
        assert.equal(BracketChecker.isBalanced('<><><<<><>>><>'), true);
      });

      it('should return false for <)<<)<<)<)', () => {
        assert.equal(BracketChecker.isBalanced('<><<><<><>'), false);
      });
    });

    describe('Testing nested brackets', () => {

      it('should return true for ({[<>]})', () => {
          assert.equal(BracketChecker.isBalanced('({[<>]})'), true);
      });

      it('should return false for ({<>)[}]', () => {
        assert.equal(BracketChecker.isBalanced('({<>)[}]'), false);
      });
    });
});

describe('Testing "BracketChecker.findBracketError()"', () => {

  describe('Testing with a string without brackets', () => {
    it('should return undefined for "Hello World"', () => {
      assert.equal(BracketChecker.findBracketError('Hello World'), undefined);
    });
  });

  describe('Testing "()" brackets', () => {

    it('should return undefined for ()', () => {
      assert.equal(BracketChecker.findBracketError('()'), undefined);
    });

    it('should return index 0 for )(', () => {
      const error = BracketChecker.findBracketError(')(');
      assert.equal(error.char, ')');
      assert.equal(error.type, 'closing');
      assert.equal(error.index, 0);
    });

    it('should return undefined for ()()((()()))()', () => {
      const error = BracketChecker.findBracketError('()()((()()))()');
      assert.equal(error, undefined);
    });

    it('should return index 2 for ()(()(()()', () => {
      const error = BracketChecker.findBracketError('()(()(()()');
      assert.equal(error.char, '(');
      assert.equal(error.type, 'opening');
      assert.equal(error.index, 2);
    });
  });

  describe('Testing "()" brackets', () => {

    it('should return undefined for ()', () => {
      assert.equal(BracketChecker.findBracketError('()'), undefined);
    });

    it('should return index 0 for )(', () => {
      const error = BracketChecker.findBracketError(')(');
      assert.equal(error.char, ')');
      assert.equal(error.type, 'closing');
      assert.equal(error.index, 0);
    });

    it('should return undefined for ()()((()()))()', () => {
      const error = BracketChecker.findBracketError('()()((()()))()');
      assert.equal(error, undefined);
    });

    it('should return index 2 for ()(()(()()', () => {
      const error = BracketChecker.findBracketError('()(()(()()');
      assert.equal(error.char, '(');
      assert.equal(error.type, 'opening');
      assert.equal(error.index, 2);
    });
  });

  describe('Testing "{}" brackets', () => {

    it('should return undefined for {}', () => {
      assert.equal(BracketChecker.findBracketError('{}'), undefined);
    });

    it('should return index 0 for }{', () => {
      const error = BracketChecker.findBracketError('}{');
      assert.equal(error.char, '}');
      assert.equal(error.type, 'closing');
      assert.equal(error.index, 0);
    });

    it('should return undefined for {}{}{{{}{}}}{}', () => {
      const error = BracketChecker.findBracketError('{}{}{{{}{}}}{}');
      assert.equal(error, undefined);
    });

    it('should return index 2 for {}{{}{{}{}', () => {
      const error = BracketChecker.findBracketError('{}{{}{{}{}');
      assert.equal(error.char, '{');
      assert.equal(error.type, 'opening');
      assert.equal(error.index, 2);
    });
  });

  describe('Testing "[]" brackets', () => {

    it('should return undefined for []', () => {
      assert.equal(BracketChecker.findBracketError('[]'), undefined);
    });

    it('should return index 0 for ][', () => {
      const error = BracketChecker.findBracketError('][');
      assert.equal(error.char, ']');
      assert.equal(error.type, 'closing');
      assert.equal(error.index, 0);
    });

    it('should return undefined for [][][[[][]]][]', () => {
      const error = BracketChecker.findBracketError('[][][[[][]]][]');
      assert.equal(error, undefined);
    });

    it('should return index 2 for [][[][[][]', () => {
      const error = BracketChecker.findBracketError('[][[][[][]');
      assert.equal(error.char, '[');
      assert.equal(error.type, 'opening');
      assert.equal(error.index, 2);
    });
  });

  describe('Testing "<>" brackets', () => {

    it('should return undefined for <>', () => {
      assert.equal(BracketChecker.findBracketError('<>'), undefined);
    });

    it('should return index 0 for ><', () => {
      const error = BracketChecker.findBracketError('><');
      assert.equal(error.char, '>');
      assert.equal(error.type, 'closing');
      assert.equal(error.index, 0);
    });

    it('should return undefined for <><><<<><>>><>', () => {
      const error = BracketChecker.findBracketError('<><><<<><>>><>');
      assert.equal(error, undefined);
    });

    it('should return index 2 for <><<><<><>', () => {
      const error = BracketChecker.findBracketError('<><<><<><>');
      assert.equal(error.char, '<');
      assert.equal(error.type, 'opening');
      assert.equal(error.index, 2);
    });
  });

  describe('Testing nested brackets', () => {

    it('should return undefined for ({[<>]})', () => {
      assert.equal(BracketChecker.findBracketError('({[<>]})'), undefined);
    });

    it('should return index 2 for ({[})', () => {
      const error = BracketChecker.findBracketError('({[})');
      assert.equal(error.char, '[');
      assert.equal(error.type, 'opening');
      assert.equal(error.index, 2);
    })
  });
});
