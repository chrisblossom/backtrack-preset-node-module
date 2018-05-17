# @backtrack/preset-node-module

[![npm](https://img.shields.io/npm/v/@backtrack/preset-node-module.svg?label=npm%20version)](https://www.npmjs.com/package/@backtrack/preset-node-module)
[![Linux Build Status](https://img.shields.io/circleci/project/github/chrisblossom/backtrack-preset-node-module/master.svg?label=linux%20build)](https://circleci.com/gh/chrisblossom/backtrack-preset-node-module/tree/master)
[![Windows Build Status](https://img.shields.io/appveyor/ci/chrisblossom/backtrack-preset-node-module/master.svg?label=windows%20build)](https://ci.appveyor.com/project/chrisblossom/backtrack-preset-node-module/branch/master)
[![Code Coverage](https://img.shields.io/coveralls/github/chrisblossom/backtrack-preset-node-module/master.svg)](https://coveralls.io/github/chrisblossom/backtrack-preset-node-module?branch=master)

## About

[`backtrack`](https://github.com/chrisblossom/backtrack) preset that sets up a node module.

## Features

*   [`babel`](https://babeljs.io/) with [`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/) targeting [`node v6.9.0`](./lib/files/babelrc.js)
*   [`flow`](https://flow.org/), [`eslint`](https://eslint.org/), and [`prettier`](https://prettier.io)
*   [`jest`](https://facebook.github.io/jest/) with [CircleCI](https://circleci.com/) and [AppVeyor](https://www.appveyor.com/)
*   `package.json` scripts `build` and `dev`
*   `prepush` and `prepublish` `git hooks`

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
                 * Disable flow
                 *
                 * default: true
                 */
                flow: false,
            },
        ],
    ],
};
```
