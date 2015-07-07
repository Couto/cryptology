'use strict';

import {expect} from 'chai';
import SimpleSubstitution from '../../lib/SimpleSubstitution.js';

describe('Simple Substitution Cipher', () => {

  describe('alphabet', () => {
    it('should have an alphabet', () => {
      expect(SimpleSubstitution.ALPHABET).to.be.a('string');
      expect(SimpleSubstitution.ALPHABET.length).to.equal(26);
    });
  });

  describe('generateKey', () => {

    it('should return a 26 length string', () => {
      let generatedKey = SimpleSubstitution.generateKey();
      expect(generatedKey).to.have.length(26);
    });

    it('should contain all letters of the alphabet', () => {
      let alphabet = 'abcdefghijklmnopqrstuvwxyz';
      let key = SimpleSubstitution.generateKey();

      let verification = alphabet.split('').every((letter) => {
        return (key.indexOf(letter) >= 0);
      });

      expect(verification).to.equal(true);
    });

    it('should be random', () => {
      let counter = 26;
      let keys = [];

      while (counter) {
        keys.push(SimpleSubstitution.generateKey());
        counter -= 1;
      }

      let verification = keys.every((key, index, keys) => {
        let firstIndex = keys.indexOf(key);
        let lastIndex = keys.lastIndexOf(key);

        return (firstIndex === lastIndex && firstIndex !== -1);
      });

      expect(verification).to.equal(true);
    });
  });

  it('Convert plaintext to ciphertext', () => {
    let key = 'zyxwvutsrqponmlkjihgfedcba';
    let simpleSubstitution = new SimpleSubstitution(key);
    let plaintext = 'abc';
    let ciphertext = 'zyx';

    expect(simpleSubstitution.encipher(plaintext)).to.equal(ciphertext);
  });

  it('Revert ciphertext to plaintext', () => {
    let key = 'zyxwvutsrqponmlkjihgfedcba';
    let simpleSubstitution = new SimpleSubstitution(key);
    let plaintext = 'abc';
    let ciphertext = 'zyx';

    expect(simpleSubstitution.decipher(ciphertext)).to.equal(plaintext);
  });
});
