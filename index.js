const promisify = require("es6-promisify");
const fs = require("fs");
const cheerio = require('cheerio');
const noreferrer = 'noreferrer';
const nofollow = 'nofollow';

class LintTargetBlank {
  constructor({domain=''}) {
    this.domain = domain;
  }
  lint(html) {
    const $ = cheerio.load(html);
    let errors = [];
    let warnings = {};
    $(`[target*='_blank']`).each((i, elem) => {
      if ($(elem).prop('name') === 'a') {
        const relAttrs = ($(elem).attr('rel') || '').split(' ');
        if (relAttrs.indexOf(nofollow) < 0 || relAttrs.indexOf(noreferrer) < 0) {
          // $.html($(elem)) gets outerHTML: https://github.com/cheeriojs/cheerio/issues/54
          errors.push({element: $.html($(elem)), type: 'error'});
        }
      }
    });
    return errors;
  }
  lintFile(filePath) {
    return promisify(fs.readFile)(filePath)
      .then(html =>
        this.lint(html)
      )
  }
}

module.exports = LintTargetBlank;
