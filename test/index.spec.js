const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const LintTargetBlank = require('./../index');
let underTest;
const path = require('path');
const getFixture = fixture => path.join(__dirname, './fixtures', fixture);
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
    underTest.lintFile(getFixture('page-without-noreferrer.html'))
      .then(lintResult => expect(lintResult).to.eql([
        expectedResult('https://this.domain/resource', 'nofollow'),
        expectedResult('http://remote.com/resource', 'nofollow'),
        expectedResult('/resource'),
        expectedResult('https://this.domain/resource', ''),
        expectedResult('https://this.domain/resource', 'nofollow'),
        expectedResult('https://remote.com/resource', ''),
        expectedResult('http://remote.com/resource', 'nofollow'),
      ]))
  );
  it('should identify links where target="_blank" without rel="noopener"',()=>
    underTest.lintFile(getFixture('page-without-noopener.html'))
      .then(lintResult => expect(lintResult).to.eql([
        expectedResult('https://this.domain/resource', 'noreferrer'),
        expectedResult('http://remote.com/resource', 'noreferrer'),
        expectedResult('/resource'),
        expectedResult('https://this.domain/resource', ''),
        expectedResult('https://this.domain/resource', 'noreferrer'),
        expectedResult('https://remote.com/resource', ''),
        expectedResult('http://remote.com/resource', 'noreferrer'),
      ]))
  );
  it('should allow links where target="_blank" with rel="noopener noreferrer"',()=>
    underTest.lintFile(getFixture('page-with-valid-target-blank.html'))
      .then(lintResult => expect(lintResult).to.eql([]))
  );
});
