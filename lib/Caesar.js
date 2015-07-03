import Cypher from './Cypher';

/**
 * @class
 */
class Caesar extends Cypher {

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
   * Convert plaintext into cyphertext
   * If stripUnknown is true, then remove characters
   * that are not present on the alphabet.
   * e.g.:
   *   caesar.encypher('h3llo w0rld', true) // koorzuog
   *   caesar.encypher('h3llo w0rld') // k3oor z0uog
   *
   * @method public
   * @param {String} plaintext
   * @param {Boolean} stripUnknown Remove unknown characters if true
   * @returns {String} cyphertext
   */
  encypher(plaintext, stripUnknown=false) {
    let letters = plaintext.split('');
    let replacementLetters = letters.map((letter) => {
      return this._shift(letter, this.direction, stripUnknown);
    });

    let cyphertext = replacementLetters.join('');

    return cyphertext;
  }

  /**
   * @method public
   * @param {String} cyphertext
   * @returns {String} plaintext
   */
  decypher(cyphertext) {
    let letters = cyphertext.split('');
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
