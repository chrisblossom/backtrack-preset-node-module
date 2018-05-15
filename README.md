# @backtrack/preset-node-module

[![npm](https://img.shields.io/npm/v/@backtrack/preset-node-module.svg?label=npm%20version)](https://www.npmjs.com/package/@backtrack/preset-node-module)

## About

[`backtrack`](https://github.com/chrisblossom/backtrack) preset that sets up a node module.

## Features

*   [`babel`](https://babeljs.io/) with [`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/) targeting [`node v6.9.0`](./files/babelrc.js)
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