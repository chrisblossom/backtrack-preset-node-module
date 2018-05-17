'use strict';

module.exports = {
    presets: ['@backtrack/preset'],
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
