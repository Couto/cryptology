import Cipher from './Cipher';

class SimpleSubstitution extends Cipher {

  encipher(plaintext) {
    return plaintext.split('').map((letter) => {
      let index = this.key.indexOf(letter);
      let char = '';

      if (index >= 0) {
        char = SimpleSubstitution.ALPHABET[index];
      }

      return char;
    }).join('');
  }

  decipher(ciphertext) {
    return ciphertext.split('').map((letter) => {
      let index = SimpleSubstitution.ALPHABET.indexOf(letter);
      let char = '';

      if (index >= 0) {
        char = this.key[index];
      }

      return char;
    }).join('');
  }

  static get ALPHABET() {
    return 'abcdefghijklmnopqrstuvwxyz';
  }

  static generateKey() {
    let alphabet = SimpleSubstitution.ALPHABET.split('');
    let key = '';

    while (alphabet.length) {
      let rnd = Math.floor(Math.random() * alphabet.length);
      key += alphabet.splice(rnd, 1);
    }

    return key;
  }
}

export default SimpleSubstitution;
