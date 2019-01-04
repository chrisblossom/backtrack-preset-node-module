'use strict';

const path = require('path');
const babelJest = require('babel-jest');

const jestBabelTransform = babelJest.createTransformer({
    babelrc: false,
    configFile: path.resolve(process.cwd(), '.babelrc.js'),
});

module.exports = jestBabelTransform;
