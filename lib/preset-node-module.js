'use strict';

module.exports = ({ options }) => {
    const {
        flow = false,
        babel = false,
        nodeVersion = '>=6.9.0',
        npmVersion = '>=3.10.10',
    } = options;

    const numberOfPresetsEnabled = [flow, babel].reduce((acc, enabled) => {
        if (enabled === true) {
            return acc + 1;
        }

        return acc;
    }, 0);

    if (numberOfPresetsEnabled > 1) {
        throw new Error('only one preset can be enabled at a time');
    }

    const presetOptions = { nodeVersion, npmVersion };

    if (flow === true) {
        const flowPreset = require('./presets/flow')(presetOptions);

        return flowPreset;
    }

    if (babel === true) {
        const babelPreset = require('./presets/babel')(presetOptions);

        return babelPreset;
    }

    const nodePreset = require('./presets/node')(presetOptions);

    return nodePreset;
};
