'use strict';

const transformConfig = require('@backtrack/core/dist/options-file/transform-config')
    .transformConfig;

test('preset returns expected config - defaults flow: true', () => {
    const backtrackConfig = {
        presets: ['../'],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('adds flow with flow: true option', () => {
    const backtrackConfig = {
        presets: [['../', { flow: true }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});
