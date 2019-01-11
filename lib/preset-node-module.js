'use strict';

module.exports = ({ options }) => {
    const {
        flow = false,
        babel = false,
        typescript = false,
        nodeVersion = '>=6.9.0',
        npmVersion = '>=3.10.10',
    } = options;

    const numberOfPresetsEnabled = [flow, babel, typescript].reduce(
        (acc, enabled) => {
            if (enabled === true) {
                return acc + 1;
            }

            return acc;
        },
        0
    );

    if (numberOfPresetsEnabled > 1) {
        throw new Error('only one preset can be enabled at a time');
    }

    const presetOptions = { nodeVersion, npmVersion };

    if (babel === true) {
        const babelPreset = require('./options/babel')(presetOptions);

        return babelPreset;
    }

    if (typescript === true) {
        const flowPreset = require('./options/typescript')(presetOptions);

        return flowPreset;
    }

    if (flow === true) {
        const flowPreset = require('./options/flow')(presetOptions);

        return flowPreset;
    }

    const nodePreset = require('./options/node')(presetOptions);

    return nodePreset;
};
