> This module has been deprecated. Please use [chrisblossom/backtrack-preset-node](https://github.com/chrisblossom/backtrack-preset-node) instead.

# @backtrack/preset-node-module

[![npm](https://img.shields.io/npm/v/@backtrack/preset-node-module.svg?label=npm%20version)](https://www.npmjs.com/package/@backtrack/preset-node-module)
[![Linux Build Status](https://img.shields.io/circleci/project/github/chrisblossom/backtrack-preset-node-module/master.svg?label=linux%20build)](https://circleci.com/gh/chrisblossom/backtrack-preset-node-module/tree/master)
[![Windows Build Status](https://img.shields.io/appveyor/ci/chrisblossom/backtrack-preset-node-module/master.svg?label=windows%20build)](https://ci.appveyor.com/project/chrisblossom/backtrack-preset-node-module/branch/master)
[![Code Coverage](https://img.shields.io/codecov/c/github/chrisblossom/backtrack-preset-node-module/master.svg)](https://codecov.io/gh/chrisblossom/backtrack-preset-node-module/branch/master)

## About

[`backtrack`](https://github.com/chrisblossom/backtrack) preset that sets up a node module.

## Features

-   [`jest`](https://facebook.github.io/jest/) with [Wallaby.js](https://wallabyjs.com/), [CircleCI](https://circleci.com/) and [AppVeyor](https://www.appveyor.com/)
-   [`eslint`](https://eslint.org/), and [`prettier`](https://prettier.io)
-   `package.json` scripts
-   `git-pre-push`, `git-pre-commit` and `prepublish` hooks
-   Optional: [`babel`](https://babeljs.io) with [`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/)
-   Optional: [`typescript`](http://www.typescriptlang.org)
-   Optional: [`flow`](https://flow.org)

## Installation

`npm install --save-dev @backtrack/preset-node-module`

## Usage

```js
// backtrack.config.js

'use strict';

module.exports = {
    presets: ['@backtrack/node-module'],
};
```

## Options

```js
'use strict';

module.exports = {
    presets: [
        [
            '@backtrack/node-module',
            {
                /**
                 * Enable Babel using @babel/preset-env
                 *
                 * default: false
                 */
                babel: true,

                /**
                 * Enable Typescript
                 * Additional requirement: npm install --save-dev typescript
                 *
                 * default: false
                 */
                typescript: true,

                /**
                 * Enable flow
                 * Additional requirement: npm install --save-dev flow-bin
                 *
                 * default: false
                 */
                flow: true,

                /**
                 * Use node >=8.9.0
                 *
                 * default: '>=6.9.0'
                 */
                nodeVersion: '>=8.9.0',

                /**
                 * Use npm >=5.0.0
                 *
                 * default: '>=3.10.10'
                 */
                npmVersion: '>=5.0.0',
            },
        ],
    ],
};
```
