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

        wallaby: (config) => {
            config.files = ['!./__sandbox__/**', ...config.files];

            return config;
        },
    },
};
