const { describe, it } = require('node:test');
const assert = require('node:assert');
const BracketChecker = require('../../BracketChecker');

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

  describe('Testing nested brackets', () => {

    it('should return true for ({[]})', () => {
        assert.equal(BracketChecker.isBalanced('({[]})'), true);
    })
  });
