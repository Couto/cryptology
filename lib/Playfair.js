import Cypher from './Cypher';

class Playfair extends Cypher {

  encypher(plaintext) {
    let preprocessed = this._preprocess(plaintext);
    console.log(preprocessed);
  }

  decypher() {

  }

  _preprocess(plaintext) {
    let preprocessed;

    preprocessed = this._replaceJwithI(plaintext);

    do {
      preprocessed = this._splitIntoBigrams(preprocessed);
      console.log('_splitIntoBigrams', preprocessed);
      preprocessed = this._splitIdenticalPairs(preprocessed);
      console.log('_splitIdenticalPairs', preprocessed);
      preprocessed = this._splitIntoBigrams(preprocessed);
      console.log('_splitIntoBigrams', preprocessed);

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
    return this._removeWhiteSpace(str).split('').map((letter, index) => {
      if (index !== 0 && index % 2) {
        return letter;
      }

      return ' ' + letter;
    }).join('');
  }

  _hasRepeatedLettersInBigram(str) {
    return str.split(' ').every((bigram) => (bigram[0] !== bigram[1]));
  }

  _splitIdenticalPairs(str) {
    return str.split(' ').map((bigram) => {
      if (bigram[0] === bigram[1]) {
        return [bigram[0], 'z', bigram[1]];
      }

      return bigram;
    }).join(' ');
  }

  _addPadding(str) {
    let bigrams = str.split(' ');
    let last = bigrams[bigrams.length - 1];

    if (last.length < 2) {
      last.push('z');
    }

    return bigrams.join(' ');
  }

  static get ALPHABET() {
    return 'abcdefghiklmnopqrstuvwxyz';
  }

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
