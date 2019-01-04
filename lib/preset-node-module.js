/* eslint-disable arrow-body-style */

'use strict';

const path = require('path');
const readPkg = require('read-pkg');
const { buildPath, rootPath, sourcePath } = require('@backtrack/core/paths');
const log = require('@backtrack/core/dist/utils/log').default;
const babel = require('./babel');
const flowCopySource = require('./flow-copy-source');
const watchDeleted = require('./watch-deleted');

const relativeBuildPath = path.relative(rootPath, buildPath);
const relativeSourcePath = path.relative(rootPath, sourcePath);

// get package name for entry file name
const pkgName = readPkg.sync({ normalize: false }).name;

// remove scope from packageId
const packageId = pkgName.split('/').pop();

module.exports = ({ options }) => {
    const {
        flow = true,
        nodeVersion = '>=6.9.0',
        npmVersion = '>=3.10.10',
    } = options;

    const preset = {
        presets: ['@backtrack/style', '@backtrack/jest'],

        packageJson: {
            main: `${relativeBuildPath}/${packageId}.js`,
            files: [`${relativeBuildPath}/`],
            engines: {
                node: nodeVersion,
                npm: npmVersion,
            },
        },

        files: [],

        config: {
            jest: {
                transform: {
                    '^.+\\.(tsx?|jsx?)$': path.resolve(
                        __dirname,
                        'jest-babel-transform.js'
                    ),
                },
            },
        },
    };

    preset.prepublishOnly = ['backtrack build'];
    preset['test.ci-pretest'] = ['backtrack lint'];
    preset.clean = { del: ['**/*'] };

    const babelEntryFile = path.resolve(buildPath, `${packageId}.js`);

    const babelDev = [
        {
            name: 'babel',
            task: () => babel({ entryFile: babelEntryFile, watch: true }),
        },
    ];
    preset.dev = [
        'backtrack clean',
        babelDev,
        () => watchDeleted({ flow }),
        () => {
            setTimeout(() => {
                log.info(
                    `watching ${relativeSourcePath}/**/*.js for changes...`
                );
            }, 1);
        },
    ];

    const babelBuild = [
        {
            name: 'babel',
            task: () => babel(),
        },
    ];

    preset.build = ['backtrack clean', babelBuild];

    preset.files.push(
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
        { src: 'files/yarnrc', dest: '.yarnrc' }
    );

    if (flow === false) {
        preset.files.push(
            { src: 'files/babel-basic.js', dest: '.babelrc.js' },
            {
                src: 'files/package-entry.js',
                dest: `${relativeSourcePath}/${packageId}.js`,
                ignoreUpdates: true,
            }
        );

        return preset;
    }

    preset.flow = ['flow'];
    preset['test.ci-pretest'].push('backtrack build', {
        name: 'flow ci',
        task: path.resolve(__dirname, 'ci-run-flow.js'),
    });

    preset.prepublishOnly.push('backtrack flow');
    preset.packageJson.files.push('flow-typed/');
    preset.prepush = ['backtrack build', 'backtrack flow'];

    const flowEntryFile = path.resolve(buildPath, `${packageId}.js.flow`);
    babelDev.push({
        name: 'flow-copy-source',
        task: () => flowCopySource({ entryFile: flowEntryFile, watch: true }),
    });

    babelBuild.push({
        name: 'flow-copy-source',
        task: () => flowCopySource(),
    });

    preset.files.push(
        {
            src: 'files/package-entry-flow.js',
            dest: `${relativeSourcePath}/${packageId}.js`,
            ignoreUpdates: true,
        },
        { src: 'files/flowconfig', dest: '.flowconfig' },
        { src: 'files/jest.flow', dest: 'flow-typed/jest.js' },
        { src: 'files/babel-flow.js', dest: '.babelrc.js' }
    );

    return preset;
};
