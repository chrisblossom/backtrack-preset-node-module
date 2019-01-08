'use strict';

module.exports = {
    presets: ['../../'],

    config: {
        eslint: {
            parser: 'babel-eslint',

            rules: {
                'no-console': 'off',
            },
        },
    },
};
