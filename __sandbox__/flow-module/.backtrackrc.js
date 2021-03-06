'use strict';

module.exports = {
    presets: [['../../', { flow: true }]],

    files: { allowChanges: '.flowconfig' },

    config: {
        eslint: {
            parser: 'babel-eslint',

            rules: {
                'no-console': 'off',
            },
        },
    },
};
