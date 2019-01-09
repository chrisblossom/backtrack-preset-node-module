'use strict';

module.exports = {
    presets: [['../../', { flow: true }]],

    config: {
        eslint: {
            parser: 'babel-eslint',

            rules: {
                'no-console': 'off',
            },
        },
    },
};
