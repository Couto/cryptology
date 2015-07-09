import Cipher from './Cipher';

class Playfair extends Cipher {

  /**
   * Encryption steps (according to Wikipedia)
   *
   * - If the bigram appears on the same row in the table, replace them with
   *   their immediate right respectively (wrapping around to left side of the
   *   row if a letter in the original pair was on the right side of the row).
   *
   * - If the letters appear on the same column, replace them with the letters
   *   immediately below respectively (wrapping around to the top of the square
   *   if a letter was on the bottom).
   *
   * - If the letters are not in the same row or column, replace them with the
   *   letters on same row respectively, but at the other pair of corners of the
   *   rectangle defined by the original pair. The order is important — the
   *   first letter of the encrypted pair is the one that lies on the same *row*
   *   as the first letter of the plaintext pair.
   *
   * @public
   * @param {String} plaintext
   * @returns {String} ciphertext
   */
  encipher(plaintext) {
    let preprocessed = this._preprocess(plaintext);

    return preprocessed.split(' ').map((bigram) => {
      let [fRow, fColumn] = this._findLetterCoordsInKey(bigram[0]);
      let [lRow, lColumn] = this._findLetterCoordsInKey(bigram[1]);
      let newBigram = '';

      if (fColumn === lColumn) {
        newBigram += this._nextInRow(fRow, fColumn);
        newBigram += this._nextInRow(lRow, fColumn);
      } else if (fRow === lRow) {
        newBigram += this._nextInColumn(fRow, fColumn);
        newBigram += this._nextInColumn(lRow, lColumn);
      } else {
        newBigram += this.key[fRow][lColumn];
        newBigram += this.key[lRow][fColumn];
      }

      return newBigram;
    }).join('');
  }

  decipher(ciphertext) {
    let preprocessed = this._splitIntoBigrams(ciphertext);

    return preprocessed.split(' ').map((bigram) => {
      let [fRow, fColumn] = this._findLetterCoordsInKey(bigram[0]);
      let [lRow, lColumn] = this._findLetterCoordsInKey(bigram[1]);
      let newBigram = '';

      if (fColumn === lColumn) {
        newBigram += this._previousInRow(fRow, fColumn);
        newBigram += this._previousInRow(lRow, fColumn);
      } else if (fRow === lRow) {
        newBigram += this._previousInColumn(fRow, fColumn);
        newBigram += this._previousInColumn(lRow, lColumn);
      } else {
        newBigram += this.key[fRow][lColumn];
        newBigram += this.key[lRow][fColumn];
      }

      return newBigram;
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

  /**
   * @private
   * @param {String} letter
   * @returns {Array}
   */
  _findLetterCoordsInKey(letter) {
    let lRow = 0;
    let lColumn = 0;

    this.key.some((row, rowIdx) => {
      return row.some((column, columnIdx) => {
        if (this.key[rowIdx][columnIdx] === letter) {
          lRow = rowIdx;
          lColumn = columnIdx;

          return true; // Break the cycle
        }
      });
    });

    return [lRow, lColumn];
  }

  /**
   * Find the letter immediately to the right of the given coordinates
   * wrap around if the letter is on the right side of the square
   *
   * @private
   * @param {Number} row
   * @param {Number} column
   * @returns {String}
   */
  _nextInColumn(row, column) {
    let newColumn = 0;

    if (column !== this.key[row].length) {
      newColumn = column + 1;
    }

    return this.key[row][newColumn];
  }

  /**
   * Find the letter immediately to the left of the given coordinates
   * wrap around if the letter is on the left side of the square
   *
   * @private
   * @param {Number} row
   * @param {Number} column
   * @returns {String}
   */
  _previousInColumn(row, column) {
    let newColumn = this.key[row].length;

    if (column !== 0) {
      newColumn = column - 1;
    }

    return this.key[row][newColumn];
  }

  /**
   * Find the letter immediately to the bottom of the given coordinates
   * wrap around if the letter is on the bottom side of the square
   *
   * @private
   * @param {Number} x
   * @param {Number} y
   * @returns {String}
   */
  _nextInRow(row, column) {
    let newRow = 0;

    if (row !== this.key.length - 1) {
      newRow = row + 1;
    }

    return this.key[newRow][column];
  }

  /**
   * Find the letter immediately to the top of the given coordinates
   * wrap around if the letter is on the top side of the square
   *
   * @private
   * @param {Number} x
   * @param {Number} y
   * @returns {String}
   */
  _previousInRow(row, column) {
    let newRow = this.key.length - 1;

    if (row !== 0) {
      newRow = row - 1;
    }

    return this.key[newRow][column];
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
