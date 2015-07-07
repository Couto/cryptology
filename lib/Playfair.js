import Cipher from './Cipher';

class Playfair extends Cipher {

  encipher(plaintext) {
    let preprocessed = this._preprocess(plaintext);

    return preprocessed.split(' ').map((bigram) => {
      // let firstLetter = this._findLetterCoordsInKey(bigram[0]);
      // let lastLetter = this._findLetterCoordsInKey(bigram[1]);
      //
      // if (this._inRow(firstLetter, lastLetter)) {
      //
      // } else if (this._inColumn(firstLetter, lastLetter)) {
      //
      // } else {
      //
      // }
      return bigram;
    }).join('');
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

    preprocessed = plaintext.replace(/j/gi, 'i');
    preprocessed = this._splitIntoBigrams(preprocessed);

    do {
      preprocessed = this._splitIdenticalPairs(preprocessed);
      preprocessed = this._splitIntoBigrams(preprocessed);
    } while (this._hasRepeatedLettersInBigrams(preprocessed));

    preprocessed = this._addPadding(preprocessed);

    return preprocessed;
  }

  /**
   * Split a string into sets of two letters.
   * Removes original whitespaces as a side effect
   *
   * e.g.:
   *   this._splitIntoBigrams('abc def g') // 'ab cd ef g'
   *
   * @private
   * @param {String} str
   * @returns {String}
   */
  _splitIntoBigrams(str) {
    let letters = str.replace(/\s/g, '').split('');

    return letters.map((letter, index, arr) => {
      if (index % 2 !== 0 && index !== arr.length - 1) {
        letter += ' ';
      }

      return letter;
    }).join('');
  }

  /**
   * Given a sentenced divided in bigrams,
   * check if any bigram as repeated letters, if so, insert the divider
   * between the letters
   * e.g.:
   *   let bigrams = 'aa bc de ef';
   *   this._splitIdenticalPairs(bigrams); // 'aza bc de ef'
   *
   * @param {String} str
   * @param {String} [divider=z]
   * @return {String}
   */
  _splitIdenticalPairs(str, divider='z') {
    return str.split(' ').map((bigram) => {
      if (bigram[0] === bigram[1]) {
        return [bigram[0], divider, bigram[1]].join('');
      }

      return bigram;
    }).join(' ');
  }

  /**
   * Return true if no bigrams have repeated letters
   * e.g.:
   *  this._hasRepeatedLettersInBigrams('ee ea') // true
   *  this._hasRepeatedLettersInBigrams('et et') // false
   *
   * the first call returns true because `ee` repeats letters in the same bigram
   * the seconde call returns false because the repetition doesnt occur
   * in the same bigram
   *
   * @private
   * @param {String} str
   * @returns {Boolean}
   */
  _hasRepeatedLettersInBigrams(str) {
    return !str.split(' ').every((bigram) => (bigram[0] !== bigram[1]));
  }

  /**
   * If the given string has an odd length, add an `z` to the end
   * This will ensure that all bigrams really have two letters each
   * e.g.:
   *   this._addPadding('az ab c') // 'az ab cz'
   *
   * @private
   * @param {String} str
   * @param {String} [padding='z']
   * @returns {String}
   */
  _addPadding(str, padding='z') {
    let bigrams = str.split(' ');
    let last = bigrams.length - 1;

    if (bigrams[last].length < 2) {
      bigrams[last] += padding;
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
   * Generates a multi-dimensional array, replicating the Playfair square.
   * The letters are displaced randomly.
   *
   * e.g:
   *  let key = Playfair.generateKey();
   *  key; // returns
   *  [
   *    ['s', 't', 'a', 'n', 'd'],
   *    ['e', 'r', 'c', 'h', 'b'],
   *    ['k', 'f', 'g', 'i', 'l'],
   *    ['m', 'o', 'p', 'q', 'u'],
   *    ['v', 'w', 'x', 'y', 'z'],
   *  ];
   *
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
