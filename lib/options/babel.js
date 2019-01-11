'use strict';

const path = require('path');
const { buildPath, rootPath, sourcePath } = require('@backtrack/core/paths');
const log = require('@backtrack/core/dist/utils/log').default;
const runBabel = require('../run-babel');
const watchDeleted = require('../watch-deleted');
const getPackageId = require('../utils/get-package-id');

const packageId = getPackageId();

const relativeBuildPath = path.relative(rootPath, buildPath);
const relativeSourcePath = path.relative(rootPath, sourcePath);
const babelEntryFile = path.resolve(buildPath, `${packageId}.js`);

module.exports = (options) => {
    const preset = {
        presets: ['@backtrack/style', '@backtrack/jest'],

        packageJson: {
            main: `${relativeBuildPath}/${packageId}.js`,
            files: [`${relativeBuildPath}/`],
            engines: {
                node: options.nodeVersion,
                npm: options.npmVersion,
            },
        },

        prepublishOnly: ['backtrack build'],
        'test.ci-pretest': ['backtrack build', 'backtrack lint'],
        clean: { del: ['**/*'] },

        dev: [
            'backtrack clean',
            {
                name: 'babel',
                task: () =>
                    runBabel({ entryFile: babelEntryFile, watch: true }),
            },
            () => watchDeleted(),
            () => {
                setTimeout(() => {
                    log.info(
                        `watching ${relativeSourcePath}/**/*.js for changes...`
                    );
                }, 1);
            },
        ],

        build: [
            'backtrack clean',
            {
                name: 'babel',
                task: () => runBabel(),
            },
        ],

        files: [
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
            { src: 'files/babel.js', dest: '.babelrc.js' },
            {
                src: 'files/package-entry.js',
                dest: `${relativeSourcePath}/${packageId}.js`,
                ignoreUpdates: true,
            },
        ],

        config: {
            jest: {
                transform: {
                    '^.+\\.(tsx?|jsx?)$': path.resolve(
                        __dirname,
                        '../jest-babel-transform.js'
                    ),
                },
            },
            eslint: {
                overrides: [
                    {
                        files: `src/${packageId}.{js,ts}`,
                        rules: {
                            'import/prefer-default-export': 'error',
                            'import/no-default-export': 'off',

                            // enable when eslint-plugin-import rule is released to npm
                            // 'import/no-named-export': 'error',
                        },
                    },
                ],
            },
        },
    };

    return preset;
};
