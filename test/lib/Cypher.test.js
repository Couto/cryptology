'use strict';

import {expect} from 'chai';
import Cypher from '../../lib/Cypher.js';

describe('Cypher', () => {

  it('should be a function', () => {
    expect(Cypher).to.be.a('function');
  });

  it('should have method `encypher`', () => {
    expect(Cypher.prototype.encypher).to.be.a('function');
  });

  it('should have method `decypher`', () => {
    expect(Cypher.prototype.decypher).to.be.a('function');
  });

});
