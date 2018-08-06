/* eslint-disable arrow-body-style */

'use strict';

const path = require('path');
const readPkgUp = require('read-pkg-up');
const babel = require('./babel');
const flowCopySource = require('./flow-copy-source');
const watchDeleted = require('./watch-deleted');
const { buildPath, rootPath, sourcePath } = require('@backtrack/core/paths');

const relativeBuildPath = path.relative(rootPath, buildPath);
const relativeSourcePath = path.relative(rootPath, sourcePath);

// get package name for entry file name
const pkgName = readPkgUp.sync({ normalize: false }).pkg.name;

// remove scope from packageId
const packageId = pkgName.split('/').pop();

module.exports = ({ options }) => {
    const { flow = true } = options;

    const preset = {
        presets: ['@backtrack/style', '@backtrack/jest'],

        packageJson: {
            main: `${relativeBuildPath}/${packageId}.js`,
            files: [`${relativeBuildPath}/`],
            engines: {
                node: '>=6.9.0',
                npm: '>=3.10.10',
            },
            babel: {
                presets: ['./.babelrc.js'],
            },
        },

        files: [],
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
    preset.dev = ['backtrack clean', babelDev, () => watchDeleted({ flow })];

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
            { src: 'files/babelrc.js', dest: '.babelrc.js' },
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
        { src: 'files/babelrc-flow.js', dest: '.babelrc.js' },
        { src: 'files/flowconfig', dest: '.flowconfig' },
        { src: 'files/jest.flow', dest: 'flow-typed/jest.js' }
    );

    return preset;
};
