import Cipher from './Cipher';
import {mod} from './utils';

class Vigenere extends Cipher {

  /**
   * @public
   * @param {String} plaintext
   * @returns {String} ciphertext
   */
  encipher(plaintext) {
    let alphabetLength = Vigenere.ALPHABET.length;
    let keyLength = this.key.length;
    let index = 0;

    return plaintext.split('').map((letter) => {
      let newLetter = '';
      let letterIndex = Vigenere.ALPHABET.indexOf(letter);

      if (letterIndex !== -1) {
        let keyLetter = this.key[index % keyLength];
        let keyLetterIndex = Vigenere.ALPHABET.indexOf(keyLetter);
        let difference = mod((keyLetterIndex + letterIndex), alphabetLength);

        index += 1;
        newLetter = Vigenere.ALPHABET[difference];
      }

      return newLetter;
    }).join('');
  }

  /**
   * @public
   * @param {String} ciphertext
   * @returns {String} plaintext
   */
  decipher(ciphertext) {
    let alphabetLength = Vigenere.ALPHABET.length;
    let keyLength = this.key.length;
    let index = 0;

    return ciphertext.split('').map((letter) => {
      let newLetter = '';
      let letterIndex = Vigenere.ALPHABET.indexOf(letter);

      if (letterIndex !== -1) {
        let keyLetter = this.key[index % keyLength];
        let keyLetterIndex = Vigenere.ALPHABET.indexOf(keyLetter);
        let difference = mod((letterIndex - keyLetterIndex), alphabetLength);

        index += 1;
        newLetter = Vigenere.ALPHABET[difference];
      }

      return newLetter;
    }).join('');
  }

  static get ALPHABET() {
    return 'abcdefghijklmnopqrstuvwxyz';
  }
}

export default Vigenere;
