# Lint target blank

A node module that reports the target="_blank" vulnerability.

Follow [this blog](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/) for a description of the vulnerability.  

## Usage
```ecmascript 6

    const LintTargetBlank = require('lint-target-blank');
    const lintTargetBlank = new LintTargetBlank({});
    const errors = lintTargetBlank.lint(`
    <div>
      <a href="somewhere.com" target="_blank"></a>
    </div>
    `)
```

## Development

To get the dependencies and test the project, execute the following:

```bash
    $ npm install
    $ npm test
```
