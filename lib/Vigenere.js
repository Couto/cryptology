import Cipher from './Cipher';

class Vigenere extends Cipher {

  encipher(plaintext) {
    return plaintext.split('').map((letter, index) => {
      let keyIndex = index % this.key.length;
      let keyLetter = this.key[keyIndex];
      let letterIndex = Vigenere.ALPHABET.indexOf(letter);
      let keyLetterIndex = Vigenere.ALPHABET.indexOf(keyLetter);
      let difference = (keyLetterIndex + letterIndex) % Vigenere.ALPHABET.length;

      return Vigenere.ALPHABET[difference];
    }).join('');
  }

  decipher(ciphertext) {
    return ciphertext.split('').map((letter, index) => {
      let keyIndex = index % this.key.length;
      let keyLetter = this.key[keyIndex];
      let letterIndex = Vigenere.ALPHABET.indexOf(letter);
      let keyLetterIndex = Vigenere.ALPHABET.indexOf(keyLetter);
      let difference = (letterIndex - keyLetterIndex) % Vigenere.ALPHABET.length;

      if (difference < 0) {
        difference += Vigenere.ALPHABET.length;
      }

      return Vigenere.ALPHABET[difference];
    }).join('');
  }

  static get ALPHABET() {
    return 'abcdefghijklmnopqrstuvwxyz';
  }
}

export default Vigenere;
