'use strict';

module.exports = {
    presets: ['@backtrack/preset'],

    packageJson: {
        files: ['lib/', 'babel-flow.js', 'babel-no-flow.js'],
    },

    config: {
        eslint: {
            overrides: [
                {
                    files: ['lib/files/package-entry*.js'],
                    parserOptions: {
                        sourceType: 'module',
                    },
                },
            ],
        },
    },
};
