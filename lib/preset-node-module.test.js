'use strict';

const transformConfig = require('@backtrack/core/dist/options-file/transform-config')
    .transformConfig;

test('preset returns expected config', () => {
    const backtrackConfig = {
        presets: ['../'],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

describe('options', () => {
    test('flow: true', () => {
        const backtrackConfig = {
            presets: [['../', { flow: true }]],
        };

        const result = transformConfig(backtrackConfig, __dirname);

        expect(result).toMatchSnapshot();
    });
});
