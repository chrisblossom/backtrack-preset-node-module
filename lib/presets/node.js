'use strict';

const path = require('path');
const { rootPath } = require('@backtrack/core/paths');
const getPackageId = require('../utils/get-package-id');

const packageId = getPackageId();

const relativeSourcePath = path.relative(rootPath, 'lib');

module.exports = (options) => {
    const preset = {
        presets: [['@backtrack/style', { node: true }], '@backtrack/jest'],

        packageJson: {
            main: `${relativeSourcePath}/${packageId}.js`,
            files: [`${relativeSourcePath}/`],
            engines: {
                node: options.nodeVersion,
                npm: options.npmVersion,
            },
        },

        'test.ci-pretest': ['backtrack lint'],

        files: [
            { makeDirs: ['lib'], skip: ['dist', 'src'] },
            {
                src: 'files/CHANGELOG.md',
                dest: 'CHANGELOG.md',
                ignoreUpdates: true,
            },
            {
                src: 'files/README.md',
                dest: 'README.md',
                ignoreUpdates: true,
            },
            { src: 'files/editorconfig', dest: '.editorconfig' },
            { src: 'files/gitignore', dest: '.gitignore' },
            { src: 'files/npmrc', dest: '.npmrc' },
            { src: 'files/yarnrc', dest: '.yarnrc' },
            {
                src: 'files/package-entry.js',
                dest: `${relativeSourcePath}/${packageId}.js`,
                ignoreUpdates: true,
            },
        ],
    };

    return preset;
};
