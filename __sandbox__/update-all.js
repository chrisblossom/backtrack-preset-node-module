#!/usr/bin/env node

'use strict';

const path = require('path');
const readDirDeep = require('read-dir-deep');
const execa = require('execa');
const del = require('del');
const fileExists = require('../lib/utils/file-exists');

async function removeNodeModules(module) {
    const fullPath = path.resolve(__dirname, module);
    const nodeModulesPath = path.resolve(fullPath, 'node_modules');
    const nodeModulesExists = await fileExists(nodeModulesPath);

    if (nodeModulesExists) {
        const result = await del(nodeModulesPath, { dryRun: false });

        result.forEach(removed => {
            const relativeRemoved = path.relative(__dirname, removed);

            console.log(relativeRemoved, 'deleted');
        });
    }
}

async function installNodeModules(module) {
    const fullPath = path.resolve(__dirname, module);

    console.log(module, 'npm install');
    await execa('npm', ['install'], {
        cwd: fullPath,
        env: { FORCE_COLOR: true },
        // https://nodejs.org/api/child_process.html#child_process_options_stdio
        stdio: [
            // stdin - forward keyboard input
            process.stdin,
            // stdout
            'pipe',
            // stderr
            'inherit',
        ],
    });
}

async function updateBacktrack(module) {
    const fullPath = path.resolve(__dirname, module);
    await execa('backtrack', ['init'], {
        cwd: fullPath,
        env: { FORCE_COLOR: true },
        // https://nodejs.org/api/child_process.html#child_process_options_stdio
        stdio: [
            // stdin - forward keyboard input
            process.stdin,
            // stdout
            'inherit',
            // stderr
            'inherit',
        ],
    });
}

async function updateAll() {
    const directories = await readDirDeep('.', {
        deep: false,
        onlyDirectories: true,
        markDirectories: false,
    });

    directories.forEach(module => {
        console.log('updating', module);
    });

    await Promise.all(directories.map(module => {
        return removeNodeModules(module);
    }));

    await Promise.all(directories.map(module => {
        return installNodeModules(module);
    }));

    console.log('npm install completed, updating backtrack...');

    await Promise.all(directories.map(module => {
        return updateBacktrack(module);
    }));
}

updateAll();
