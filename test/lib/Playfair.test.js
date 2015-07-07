'use strict';

import {expect} from 'chai';
import Playfair from '../../lib/Playfair.js';

describe.only('Playfair Cypher', () => {

  describe('generateKey', () => {

    let key = Playfair.generateKey();

    it('should return an array with length of 5', () => {
      expect(key).to.be.an('array');
      expect(key).to.have.length(5);
    });

    it('should contain 5 letters in each row', () => {

      key.forEach((row) => {
        expect(row).to.have.length(5);
        row.forEach((letter) => {
          expect(letter).to.match(/[a-z]/);
        });
      });

    });

    it('should not contain the letter `j`', () => {
      key.forEach((row) => {
        row.forEach((letter) => {
          expect(letter).not.to.match(/j/i);
        });
      });
    });

    it('should never repeat letters even accross rows', () => {
      let occurrences = [];
      key.forEach((row) => {
        row.forEach((letter) => {
          let index = occurrences.indexOf(letter);
          expect(index).to.equal(-1);
          occurrences.push(letter);
        });
      });
    });
  });

  describe('Preprocess', () => {
    let plaintext = 'natterjack toad';
    let preprocessed = 'na tz te ri ac kt oa dz';
    let playfair = new Playfair(Playfair.generateKey());

    it('should preprocess the plaintext correctly', () => {
      expect(playfair._preprocess(plaintext)).to.equal(preprocessed);
    });
  });

  describe('With given key', () => {
    let plaintext = 'natterjack toad';
    let cyphertext = 'dndwsrhfcgfsptbd';
    let key = [
      ['s', 't', 'a', 'n', 'd'],
      ['e', 'r', 'c', 'h', 'b'],
      ['k', 'f', 'g', 'i', 'l'],
      ['m', 'o', 'p', 'q', 'u'],
      ['v', 'w', 'x', 'y', 'z']
    ];
    let playfair = new Playfair(key);

    it('Convert plaintext to cyphertext', () => {
      expect(playfair.encypher(plaintext)).to.equal(cyphertext);
    });

    it('Revert cyphertext to plaintext', () => {
      expect(playfair.decypher(cyphertext)).to.equal(plaintext);
    });

  });

});
