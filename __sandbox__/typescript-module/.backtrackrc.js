'use strict';

module.exports = {
    presets: [['../../', { typescript: true }]],

    config: {
        eslint: {
            parser: 'babel-eslint',

            rules: {
                'no-console': 'off',
            },
        },
    },
};
