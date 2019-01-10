'use strict';

const transformConfig = require('@backtrack/core/dist/options-file/transform-config')
    .transformConfig;

test('basic node', () => {
    const backtrackConfig = {
        presets: ['../'],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('babel: true', () => {
    const backtrackConfig = {
        presets: [['../', { babel: true }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('flow: true', () => {
    const backtrackConfig = {
        presets: [['../', { flow: true }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('cannot have more than one option true', () => {
    expect.hasAssertions();
    const backtrackConfig = {
        presets: [['../', { flow: true, babel: true }]],
    };

    try {
        transformConfig(backtrackConfig, __dirname);
    } catch (error) {
        expect(error).toMatchSnapshot();
    }
});
