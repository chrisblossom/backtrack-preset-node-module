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

test('typescript: true', () => {
    const backtrackConfig = {
        presets: [['../', { typescript: true }]],
    };

    const result = transformConfig(backtrackConfig, __dirname);

    expect(result).toMatchSnapshot();
});

test('cannot have more than one option true', () => {
    expect.assertions(4);

    try {
        const backtrackConfig = {
            presets: [['../', { flow: true, babel: true }]],
        };
        transformConfig(backtrackConfig, __dirname);
    } catch (error) {
        expect(error).toMatchSnapshot();
    }

    try {
        const backtrackConfig = {
            presets: [['../', { typescript: true, babel: true }]],
        };
        transformConfig(backtrackConfig, __dirname);
    } catch (error) {
        expect(error).toMatchSnapshot();
    }

    try {
        const backtrackConfig = {
            presets: [['../', { typescript: true, flow: true }]],
        };
        transformConfig(backtrackConfig, __dirname);
    } catch (error) {
        expect(error).toMatchSnapshot();
    }

    try {
        const backtrackConfig = {
            presets: [['../', { typescript: true, flow: true, babel: true }]],
        };
        transformConfig(backtrackConfig, __dirname);
    } catch (error) {
        expect(error).toMatchSnapshot();
    }
});
