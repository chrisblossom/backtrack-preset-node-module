'use strict';

const path = require('path');
const { buildPath, rootPath, sourcePath } = require('@backtrack/core/paths');
const log = require('@backtrack/core/dist/utils/log').default;
const runBabel = require('../run-babel');
const flowCopySource = require('../flow-copy-source');
const watchDeleted = require('../watch-deleted');
const getPackageId = require('../utils/get-package-id');

const packageId = getPackageId();

const relativeBuildPath = path.relative(rootPath, buildPath);
const relativeSourcePath = path.relative(rootPath, sourcePath);
const babelEntryFile = path.resolve(buildPath, `${packageId}.js`);
const flowEntryFile = path.resolve(buildPath, `${packageId}.js.flow`);

module.exports = (options) => {
    const preset = {
        presets: ['@backtrack/style', '@backtrack/jest'],

        packageJson: {
            main: `${relativeBuildPath}/${packageId}.js`,
            files: [`${relativeBuildPath}/`, 'flow-typed/'],
            engines: {
                node: options.nodeVersion,
                npm: options.npmVersion,
            },
        },

        prepublishOnly: ['backtrack build', 'backtrack flow'],
        'git-pre-push': ['backtrack build', 'backtrack flow'],
        flow: ['flow'],
        'test.ci-pretest': [
            'backtrack build',
            'backtrack lint',
            {
                name: 'flow ci',
                task: path.resolve(__dirname, '../ci-run-flow.js'),
            },
        ],

        clean: { del: ['**/*'] },

        dev: [
            'backtrack clean',
            [
                {
                    name: 'babel',
                    task: () =>
                        runBabel({ entryFile: babelEntryFile, watch: true }),
                },
                {
                    name: 'flow-copy-source',
                    task: () =>
                        flowCopySource({
                            entryFile: flowEntryFile,
                            watch: true,
                        }),
                },
            ],
            () => watchDeleted({ flow: true }),
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
            [
                {
                    name: 'babel',
                    task: () => runBabel(),
                },
                {
                    name: 'flow-copy-source',
                    task: () => flowCopySource(),
                },
            ],
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
            {
                src: 'files/package-entry-flow.js',
                dest: `${relativeSourcePath}/${packageId}.js`,
                ignoreUpdates: true,
            },
            { src: 'files/flowconfig', dest: '.flowconfig' },
            { src: 'files/jest.flow', dest: 'flow-typed/jest.js' },
            { src: 'files/babel.js', dest: '.babelrc.js' },
        ],

        config: {
            babel: {
                presets: [require.resolve('@babel/preset-flow')],
            },
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
