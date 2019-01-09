'use strict';

module.exports = {
    presets: [['../../', { babel: true }]],

    config: {
        eslint: {
            parser: 'babel-eslint',

            rules: {
                'no-console': 'off',
            },
        },
    },
};
