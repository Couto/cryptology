import Cipher from './Cipher';

/**
 * @class
 */
class Caesar extends Cipher {

  /**
   * @constructor
   * @param {Number} [key=13] Number representing the secret key
   * @param {String} [direction] Where to shift the alphabet
   */
  constructor(key=13, direction='left') {
    super(key);
    this.direction = direction;
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
  }

  /**
   * Convert plaintext into ciphertext
   * If stripUnknown is true, then remove characters
   * that are not present on the alphabet.
   * e.g.:
   *   caesar.encipher('h3llo w0rld', true) // koorzuog
   *   caesar.encipher('h3llo w0rld') // k3oor z0uog
   *
   * @method public
   * @param {String} plaintext
   * @param {Boolean} [stripUnknown=false] Remove unknown characters if true
   * @returns {String} ciphertext
   */
  encipher(plaintext, stripUnknown=false) {
    let letters = plaintext.split('');
    let replacementLetters = letters.map((letter) => {
      return this._shift(letter, this.direction, stripUnknown);
    });

    let ciphertext = replacementLetters.join('');

    return ciphertext;
  }

  /**
   * @method public
   * @param {String} ciphertext
   * @returns {String} plaintext
   */
  decipher(ciphertext) {
    let letters = ciphertext.split('');
    let direction = (this.direction === 'left') ? 'right' : 'left';
    let replacementLetters = letters.map((letter) => {
      return this._shift(letter, direction);
    });

    let plaintext = replacementLetters.join('');

    return plaintext;
  }

  /**
   * @method private
   * @param {String} letter
   * @returns {String} direction
   */
  _shift(letter, direction, stripUnknown) {

    let letterIndex = this.alphabet.indexOf(letter);

    if (letterIndex < 0) {
      return (!stripUnknown) ? letter : '';
    }

    let replacementIndex = (direction === 'right') ?
        this._shiftRight(letterIndex) :
        this._shiftLeft(letterIndex);

    return this.alphabet[replacementIndex];
  }

  /**
   * @method private
   * @param {Number} index
   * @returns {Number} shiftedIndex
   */
  _shiftLeft(index) {
    let shiftedIndex = index - this.key;

    if (shiftedIndex < 0) {
      shiftedIndex = shiftedIndex + this.alphabet.length;
    }

    return shiftedIndex;
  }

  /**
   * @method private
   * @param {Number} index
   * @returns {Number} shiftedIndex
   */
  _shiftRight(index) {
    let shiftedIndex = index + this.key;

    if (shiftedIndex >= this.alphabet.length) {
      shiftedIndex = shiftedIndex - this.alphabet.length;
    }

    return shiftedIndex;
  }

}

export default Caesar;
