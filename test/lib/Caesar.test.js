'use strict';

import {expect} from 'chai';
import Caesar from '../../lib/Caesar.js';

describe('Caesar Cipher', () => {

  describe('defaults (ROT13)', () => {

    let caesar;
    let plaintext = 'the quick brown fox jumps over the lazy dog';
    let ciphertext = 'gur dhvpx oebja sbk whzcf bire gur ynml qbt';

    beforeEach(() => {
      caesar = new Caesar();
    });

    it('should convert between plaintext and ciphertext', () => {
      let convertedCiphertext = caesar.encipher(plaintext);

      expect(convertedCiphertext).to.equal(ciphertext);
    });

    it('should revert ciphertext into plaintext', () => {
      let convertedPlaintext = caesar.decipher(ciphertext);

      expect(convertedPlaintext).to.equal(plaintext);
    });

    it('should remove unrecognized characters', () => {
      let ciphertext = caesar.encipher(plaintext, true);
      expect(ciphertext).to.equal('gurdhvpxoebjasbkwhzcfbiregurynmlqbt');
    });

  });

  describe('shift 3 letters to the right', () => {

    let caesar;
    let plaintext = 'the quick brown fox jumps over the lazy dog';
    let ciphertext = 'wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj';

    beforeEach(() => {
      caesar = new Caesar(3, 'right');
    });

    it('should convert between plaintext and ciphertext', () => {
      let convertedCiphertext = caesar.encipher(plaintext);

      expect(convertedCiphertext).to.equal(ciphertext);
    });

    it('should revert ciphertext into plaintext', () => {
      let convertedPlaintext = caesar.decipher(ciphertext);

      expect(convertedPlaintext).to.equal(plaintext);
    });
  });

  describe('shift 3 letters to the left', () => {
    let caesar;
    let plaintext = 'the quick brown fox jumps over the lazy dog';
    let ciphertext = 'qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald';

    beforeEach(() => {
      caesar = new Caesar(3, 'left');
    });

    it('should convert between plaintext and ciphertext', () => {
      let convertedCiphertext = caesar.encipher(plaintext);

      expect(convertedCiphertext).to.equal(ciphertext);
    });

    it('should revert ciphertext into plaintext', () => {
      let convertedPlaintext = caesar.decipher(ciphertext);

      expect(convertedPlaintext).to.equal(plaintext);
    });
  });

});
