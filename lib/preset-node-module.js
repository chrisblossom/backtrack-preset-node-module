'use strict';

const readPkgUp = require('read-pkg-up');

// get package name for entry file name
const pkgName = readPkgUp.sync({ normalize: false }).pkg.name;

// remove scope from packageId
const packageId = pkgName.split('/').pop();

module.exports = {
    presets: ['@backtrack/style', '@backtrack/jest'],

    packageJson: {
        main: `dist/${packageId}.js`,
        files: ['dist/', 'flow-typed/'],
        engines: {
            node: '>=6.9.0',
            npm: '>=3.10.10',
            yarn: '>=1.6.0',
        },
        devEngines: {
            node: '>=8.9.0',
            npm: '>=5.5.1',
        },
        babel: {
            presets: ['./.babelrc.js'],
        },
    },

    'check-all': [['backtrack lint', 'backtrack flow', 'backtrack test']],
    prepush: ['backtrack check-all'],
    prepublishOnly: ['backtrack check-all', 'backtrack build'],

    flow: ['flow'],

    clean: {
        del: ['**/*'],
    },

    dev: [
        'backtrack clean',
        [
            {
                name: 'babel',
                task:
                    'babel -w src/ -d dist/ --ignore test.js,__sandbox__/ --source-maps',
            },
            {
                name: 'flow-copy-source',
                task:
                    'flow-copy-source -w --ignore **/*.test.js --ignore **/__sandbox__/**/* src dist',
            },
        ],
    ],

    build: [
        'backtrack clean',
        [
            {
                name: 'babel',
                task:
                    'babel src -d dist --ignore test.js,__sandbox__/ --source-maps',
            },
            {
                name: 'flow-copy-source',
                task:
                    'flow-copy-source --ignore **/*.test.js --ignore **/__sandbox__/**/* src dist',
            },
        ],
    ],

    files: [
        {
            src: 'files/package-entry.js',
            dest: `src/${packageId}.js`,
            ignoreUpdates: true,
        },
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
        {
            src: 'files/editorconfig',
            dest: '.editorconfig',
        },
        {
            src: 'files/babelrc.js',
            dest: '.babelrc.js',
        },
        {
            src: 'files/flowconfig',
            dest: '.flowconfig',
        },
        {
            src: 'files/gitignore',
            dest: '.gitignore',
        },
        {
            src: 'files/npmignore',
            dest: '.npmignore',
        },
        {
            src: 'files/npmrc',
            dest: '.npmrc',
        },
        {
            src: 'files/yarnrc',
            dest: '.yarnrc',
        },

        /**
         * Use custom circle config to include flow and lint checks
         */
        {
            src: 'files/circleci-v2.yml',
            dest: '.circleci/config.yml',
        },
    ],
};
