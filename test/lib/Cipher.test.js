'use strict';

import {expect} from 'chai';
import Cipher from '../../lib/Cipher.js';

describe('Cipher', () => {

  it('should be a function', () => {
    expect(Cipher).to.be.a('function');
  });

  it('should have method `encipher`', () => {
    expect(Cipher.prototype.encipher).to.be.a('function');
  });

  it('should have method `decipher`', () => {
    expect(Cipher.prototype.decipher).to.be.a('function');
  });

});
