'use strict';

import {expect} from 'chai';
import Vigenere from '../../lib/Vigenere.js';

describe('Vigenère Cipher', () => {

  it('should strip unknown characters', () => {
    let key = 'lemon';
    let vigenere = new Vigenere(key);

    expect(vigenere.encipher('123')).to.equal('');
    expect(vigenere.encipher('attack at dawn')).to.equal('lxfopvefrnhr');
  });

  describe('With given key (dig)', () => {
    let key = 'dig';
    let plaintext = 'aardvarkseatants';
    let ciphertext = 'dixgdgusyhizdvzv';
    let vigenere = new Vigenere(key);

    it('should convert plaintext to ciphertext', () => {
      expect(vigenere.encipher(plaintext)).to.equal(ciphertext);
    });

    it('should revert ciphertext to plaintext', () => {
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
