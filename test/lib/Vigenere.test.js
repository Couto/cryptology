'use strict';

import {expect} from 'chai';
import Vigenere from '../../lib/Vigenere.js';

describe('Vigenère Cipher', () => {

  describe('With given key (dig)', () => {
    let key = 'dig';
    let plaintext = 'aardvarkseatants';
    let ciphertext = 'dixgdgusyhizdvzv';
    let vigenere = new Vigenere(key);

    it('Convert plaintext to ciphertext', () => {
      expect(vigenere.encipher(plaintext)).to.equal(ciphertext);
    });

    it('Revert ciphertext to plaintext', () => {
      expect(vigenere.decipher(ciphertext)).to.equal(plaintext);
    });

  });

  describe('With given key (lemon)', () => {
    let key = 'lemon';
    let plaintext = 'attackatdawn';
    let ciphertext = 'lxfopvefrnhr';
    let vigenere = new Vigenere(key);

    it('Convert plaintext to ciphertext', () => {
      expect(vigenere.encipher(plaintext)).to.equal(ciphertext);
    });

    it('Revert ciphertext to plaintext', () => {
      expect(vigenere.decipher(ciphertext)).to.equal(plaintext);
    });

  });
});
