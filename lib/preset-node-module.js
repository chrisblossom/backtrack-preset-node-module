'use strict';

module.exports = {
    presets: ['@backtrack/style', '@backtrack/jest'],

    packageJson: {
        scripts: {
            prepush: 'npm run lint && npm run flow && npm run test',
            prepublishOnly: 'npm run lint && npm run flow && npm run test && npm run build',
        },
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

    flow: 'flow',

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
    ],
};
