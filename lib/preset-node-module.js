'use strict';

module.exports = ({ options }) => {
    const {
        flow = false,
        babel = false,
        nodeVersion = '>=6.9.0',
        npmVersion = '>=3.10.10',
    } = options;

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
