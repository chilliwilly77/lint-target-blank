const { expect } = require('chai');
const { describe, it } = require('mocha');

describe('lint-target-blank', ()=>{
  it('should identify links where target="_blank" without rel="noopener noreferrer"',()=>
    expect('foo').to.equal('bar')
  );
});
