'use strict';

module.exports = {
    presets: ['@backtrack/preset'],

    files: { allowChanges: 'wallaby.config.js' },

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
