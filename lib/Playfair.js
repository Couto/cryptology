import Cypher from './Cypher';

class Playfair extends Cypher {

  encypher(plaintext) {
    let preprocessed = this._preprocess(plaintext);

    return preprocessed.split(' ').map((bigram) => {
      let firstLetter = this._findLetterCoordsInKey(bigram[0]);
      let lastLetter = this._findLetterCoordsInKey(bigram[1]);

      if (this._inRow(firstLetter, lastLetter)) {

      } else if (this._inColumn(firstLetter, lastLetter)) {

      } else {

      }

    }).join('');
  }

  decypher() {

  }

  /**
   * Preprocess the plaintext according to the Playfair rules
   *
   *   1. Replace the letter J with the letter I
   *   2. Split the sentence into bigrams (sets of two letters)
   *   3. If any bigram has repeated letters, insert a Z in the middle
   *   4. Add a padding letter (z) if the result sentence has an odd length
   *
   * @private
   * @param {String} plaintext
   * @returns {String} preprocessed
   */
  _preprocess(plaintext) {
    let preprocessed;

    preprocessed = this._replaceJwithI(plaintext);

    do {
      preprocessed = this._splitIntoBigrams(preprocessed);
      preprocessed = this._splitIdenticalPairs(preprocessed);
      preprocessed = this._splitIntoBigrams(preprocessed);
    } while (this._hasRepeatedLettersInBigram(preprocessed));

    preprocessed = this._addPadding(preprocessed);

    return preprocessed;
  }

  _removeWhiteSpace(str) {
    return str.replace(/\s/g, '');
  }

  _replaceJwithI(str) {
    return str.replace(/j/ig, 'i');
  }

  _splitIntoBigrams(str) {
    return this._removeWhiteSpace(str).split('').map((letter, index, arr) => {
      if (index % 2 !== 0 && index !== arr.length - 1) {
        return letter + ' ';
      }

      return letter;
    }).join('');
  }

  /**
   *
   * @param {String} str
   * @return {String}
   */
  _splitIdenticalPairs(str) {
    return str.split(' ').map((bigram) => {
      if (bigram[0] === bigram[1]) {
        return [bigram[0], 'z', bigram[1]].join('');
      }

      return bigram;
    }).join(' ');
  }

  /**
   * Return true if no bigrams have repeated letters
   * e.g.:
   *
   *  `ee ea` returns true because `ee` repeats letters in the same bigram
   *  `et et` returns false since the repetition doesnt occur in the same bigram
   *
   * @private
   * @param {String} str
   * @returns {Boolean}
   */
  _hasRepeatedLettersInBigram(str) {
    return !str.split(' ').every((bigram) => (bigram[0] !== bigram[1]));
  }

  /**
   * If the given string has an odd length, add an `z` to the end
   * This will ensure that all bigrams really have two letters each
   *
   * @private
   * @param {String} str
   * @returns {String}
   */
  _addPadding(str) {
    let bigrams = str.split(' ');
    let last = bigrams[bigrams.length - 1];

    if (last.length < 2) {
      bigrams[bigrams.length - 1] += 'z';
    }

    return bigrams.join(' ');
  }

  _inRow(firstLetter, lastLetter) {
    return (firstLetter.y === lastLetter.y);
  }

  _inColumn(firstLetter, lastLetter) {
    return (firstLetter.x === lastLetter.x);
  }

  /**
   * @private
   * @param {String} letter
   * @returns {Object}
   */
  _findLetterCoordsInKey(letter) {
    let x = 0;
    let y = 0;

    this.key.some((row, rowIndex) => {
      return row.some((column, columnIndex) => {
        if (this.key[row][column] === letter) {
          x = rowIndex;
          y = columnIndex;

          return true; // Break the cycle
        }
      });
    });

    return {x: x, y: y};
  }

  static get ALPHABET() {
    return 'abcdefghiklmnopqrstuvwxyz';
  }

  /**
   * @static
   * @returns {Array}
   */
  static generateKey() {
    let alphabet = Playfair.ALPHABET.split('');
    let square = [];

    while (alphabet.length) {
      let row = [];
      let columns = 5;

      while (row.length < columns) {
        let rnd = Math.floor(Math.random() * alphabet.length);
        let letter = alphabet.splice(rnd, 1).pop();

        row.push(letter);
      }

      square.push(row);
      row = [];
    }

    return square;
  }
}

export default Playfair;
