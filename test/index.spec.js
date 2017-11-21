const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const LintTargetBlank = require('./../index');
let underTest;
const path = require('path');
const getFixture = fixture => path.join(__dirname, './fixtures', 'page-without-both-rel.html');
const expectedResult = (href, rel=null) => ({
  element: `<a href=\"${href}\" target=\"_blank\"${rel !== null ? ` rel=\"${rel}\"`: '' }></a>`,
  type: 'error'
});

describe('lint-target-blank', ()=>{
  beforeEach(() => {
    underTest = new LintTargetBlank({});
  });
  it('should identify links where target="_blank" without rel="noopener noreferrer"', () =>
    underTest.lintFile(getFixture('page-without-both-rel.html'))
      .then(lintResult => expect(lintResult).to.eql([
        expectedResult('/resource'),
        expectedResult('https://this.domain/resource', ''),
        expectedResult('https://this.domain/resource', 'noreferrer'),
        expectedResult('https://this.domain/resource', 'nofollow'),
        expectedResult('https://remote.com/resource', ''),
        expectedResult('http://remote.com/resource', 'noreferrer'),
        expectedResult('http://remote.com/resource', 'nofollow'),
      ]))
  );
  it('should identify links where target="_blank" without rel="noreferrer"',()=>
    expect('foo').to.equal('bar')
  );
  it('should identify links where target="_blank" without rel="noopener"',()=>
    expect('foo').to.equal('bar')
  );
  it(`should issue warning for links where target="_blank" without either rel="noopener/noreferrer"
for links to same domain`,()=>
    expect('foo').to.equal('bar')
  );
  it('should allow links where target="_blank" with rel="noopener noreferrer"',()=>
    expect('foo').to.equal('bar')
  );
});
