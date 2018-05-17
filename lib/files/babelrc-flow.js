/**
 * This file is managed by backtrack
 *
 * source: @backtrack/preset-node-module
 * namespace: babel
 *
 * DO NOT MODIFY
 */

'use strict';

const Backtrack = require('@backtrack/core');

const { configManager } = new Backtrack();

const babel = {
    presets: [
        [
            'env',
            {
                targets: {
                    node: '6.9.0',
                },
                useBuiltIns: true,
            },
        ],
        'flow',
    ],
    plugins: [
        'dynamic-import-node',
        'transform-object-rest-spread',
        ['transform-class-properties', { spec: true }],
    ],
};

module.exports = configManager({
    namespace: 'babel',
    config: babel,
});
