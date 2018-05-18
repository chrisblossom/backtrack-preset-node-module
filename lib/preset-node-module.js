'use strict';

const readPkgUp = require('read-pkg-up');

// get package name for entry file name
const pkgName = readPkgUp.sync({ normalize: false }).pkg.name;

// remove scope from packageId
const packageId = pkgName.split('/').pop();

/* istanbul ignore next */
module.exports = ({ options = {} } = {}) => {
    const { flow = true } = options;

    const result = {
        presets: ['@backtrack/style', '@backtrack/jest'],

        packageJson: {
            main: `dist/${packageId}.js`,
            files: ['dist/'],
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

        'check-all': [['backtrack lint', 'backtrack test']],
        prepush: [false, 'backtrack check-all'],
        prepublishOnly: [false, 'backtrack check-all', 'backtrack build'],

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
            {
                src: 'files/editorconfig',
                dest: '.editorconfig',
            },
            {
                src: 'files/gitignore',
                dest: '.gitignore',
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

    if (flow === false) {
        result.files.push({
            src: 'files/package-entry.js',
            dest: `src/${packageId}.js`,
            ignoreUpdates: true,
        });

        result.files.push({
            src: 'files/babelrc.js',
            dest: '.babelrc.js',
        });

        result.files.push({
            src: 'files/circleci-v2.yml',
            dest: '.circleci/config.yml',
        });

        return result;
    }

    result.flow = ['flow'];
    result.packageJson.files.push('flow-typed/');
    result['check-all'][0].push('backtrack flow');

    result.dev[1].push({
        name: 'flow-copy-source',
        task:
            'flow-copy-source -w --ignore "**/*.test.js" --ignore "**/__sandbox__/**/*" src dist',
    });

    result.build[1].push({
        name: 'flow-copy-source',
        task:
            'flow-copy-source --ignore "**/*.test.js" --ignore "**/__sandbox__/**/*" src dist',
    });

    result.files.push({
        src: 'files/package-entry-flow.js',
        dest: `src/${packageId}.js`,
        ignoreUpdates: true,
    });

    result.files.push({
        src: 'files/babelrc-flow.js',
        dest: '.babelrc.js',
    });

    result.files.push({
        src: 'files/flowconfig',
        dest: '.flowconfig',
    });

    result.files.push({
        src: 'files/circleci-v2-flow.yml',
        dest: '.circleci/config.yml',
    });

    return result;
};
