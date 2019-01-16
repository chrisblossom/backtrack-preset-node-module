'use strict';

module.exports = {
    presets: ['@backtrack/preset'],

    config: {
        wallaby: (config) => {
            config.files = ['!./__sandbox__/**', ...config.files];

            return config;
        },
    },
};
