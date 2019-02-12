'use strict';

const path = require('path');
const { buildPath, rootPath, sourcePath } = require('@backtrack/core/paths');
const log = require('@backtrack/core/dist/utils/log').default;
const runBabel = require('../run-babel');
const copyFiles = require('../copy-files');
const watchDeleted = require('../watch-deleted');
const getPackageId = require('../utils/get-package-id');

const packageId = getPackageId();

const relativeBuildPath = path.relative(rootPath, buildPath);
const relativeSourcePath = path.relative(rootPath, sourcePath);
const entryFile = path.resolve(buildPath, `${packageId}.js`);

module.exports = (options) => {
    const preset = {
        presets: ['@backtrack/style', '@backtrack/jest'],

        packageJson: {
            main: `${relativeBuildPath}/${packageId}.js`,
            types: `${relativeBuildPath}/${packageId}.d.ts`,
            files: [`${relativeBuildPath}/`],
            engines: {
                node: options.nodeVersion,
                npm: options.npmVersion,
            },
        },

        prepublishOnly: ['backtrack build', 'backtrack typescript'],
        'git-pre-push': ['backtrack build', 'backtrack typescript'],
        typescript: ['tsc'],
        'test.ci-pretest': [
            'backtrack build',
            'backtrack lint',
            'backtrack typescript',
        ],

        clean: { del: ['**/*'] },

        dev: [
            'backtrack clean',
            [
                {
                    name: 'babel',
                    task: () =>
                        runBabel({
                            entryFile,
                            watch: true,
                            extensions: '.ts,.js',
                        }),
                },
                { name: 'copy files', task: () => copyFiles.watch() },
            ],
            () => watchDeleted({}),
            () => {
                setTimeout(() => {
                    log.info(
                        `watching ${relativeSourcePath}/**/*.{ts,js,json} for changes...`
                    );
                }, 1);
            },
        ],

        build: [
            'backtrack clean',
            [
                {
                    name: 'babel',
                    task: () => runBabel({ extensions: '.ts,.js' }),
                },
                {
                    name: 'generate typescript declarations',
                    task: 'tsc --project tsconfig.declaration.json',
                },
                { name: 'copy files', task: () => copyFiles() },
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
                src: 'files/package-entry.js',
                dest: `${relativeSourcePath}/${packageId}.ts`,
                ignoreUpdates: true,
            },
            { src: 'files/babel.js', dest: '.babelrc.js' },
            { src: 'files/tsconfig.json', dest: 'tsconfig.json' },
            {
                src: 'files/tsconfig.declaration.json',
                dest: 'tsconfig.declaration.json',
            },
            {
                src: 'files/global.d.ts',
                dest: 'global.d.ts',
                ignoreUpdates: true,
            },
        ],

        config: {
            babel: {
                presets: [require.resolve('@babel/preset-typescript')],
            },
        },
    };

    return preset;
};
