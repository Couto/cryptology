import Cypher from './Cypher';

class SimpleSubstitution extends Cypher {

  constructor(key) {
    super(key);
  }

  encrypt() {}

  decrypt() {}

  static generateKey() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let key = '';

    while (alphabet.length) {
      let rnd = Math.floor(Math.random() * alphabet.length);
      key += alphabet.splice(rnd, 1);
    }

    return key;
  }
}

export default SimpleSubstitution;
