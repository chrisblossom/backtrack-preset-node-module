#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;
const os = require('os');

/**
 * Do not test flow in Windows
 * Flow is not consistent in Windows
 */
if (os.platform() === 'win32') {
    return;
}

const command = 'flow';
try {
    execSync(command, {
        stdio: 'inherit',
    });
} catch (error) {
    process.exit(1);
}
