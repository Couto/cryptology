'use strict';

import {expect} from 'chai';
import Caesar from '../../lib/Caesar.js';

describe('Caesar Cypher', () => {

  describe('defaults (ROT13)', () => {

    let caesar;
    let plaintext = 'the quick brown fox jumps over the lazy dog';
    let cyphertext = 'gur dhvpx oebja sbk whzcf bire gur ynml qbt';

    beforeEach(() => {
      caesar = new Caesar();
    });

    it('should convert between plaintext and cyphertext', () => {
      let convertedCyphertext = caesar.encypher(plaintext);

      expect(convertedCyphertext).to.equal(cyphertext);
    });

    it('should revert cyphertext into plaintext', () => {
      let convertedPlaintext = caesar.decypher(cyphertext);

      expect(convertedPlaintext).to.equal(plaintext);
    });

    it('should remove unrecognized characters', () => {
      let cyphertext = caesar.encypher(plaintext, true);
      expect(cyphertext).to.equal('gurdhvpxoebjasbkwhzcfbiregurynmlqbt');
    });

  });

  describe('shift 3 letters to the right', () => {

    let caesar;
    let plaintext = 'the quick brown fox jumps over the lazy dog';
    let cyphertext = 'wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj';

    beforeEach(() => {
      caesar = new Caesar(3, 'right');
    });

    it('should convert between plaintext and cyphertext', () => {
      let convertedCyphertext = caesar.encypher(plaintext);

      expect(convertedCyphertext).to.equal(cyphertext);
    });

    it('should revert cyphertext into plaintext', () => {
      let convertedPlaintext = caesar.decypher(cyphertext);

      expect(convertedPlaintext).to.equal(plaintext);
    });
  });

  describe('shift 3 letters to the left', () => {

    let caesar;
    let plaintext = 'the quick brown fox jumps over the lazy dog';
    let cyphertext = 'qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald';

    beforeEach(() => {
      caesar = new Caesar(3, 'left');
    });

    it('should convert between plaintext and cyphertext', () => {
      let convertedCyphertext = caesar.encypher(plaintext);

      expect(convertedCyphertext).to.equal(cyphertext);
    });

    it('should revert cyphertext into plaintext', () => {
      let convertedPlaintext = caesar.decypher(cyphertext);

      expect(convertedPlaintext).to.equal(plaintext);
    });
  });

});
