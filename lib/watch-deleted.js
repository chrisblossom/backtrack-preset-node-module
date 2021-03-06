'use strict';

const chokidar = require('chokidar');
const path = require('path');
const log = require('@backtrack/core/dist/utils/log').default;
const del = require('del');
const { rootPath, sourcePath, buildPath } = require('@backtrack/core/paths');
const exitHook = require('./utils/exit-hook');

/**
 * babel-cli does not delete src files that have been removed.
 * watch sourcePath for deleted files and remove them from buildPath
 */
function watchDeleted({ flow = false } = {}) {
    const watcher = chokidar.watch('**/*.{js,jsx,ts,tsx,json}', {
        ignored: ['**/*.test.{js,ts}', '**/__sandbox__/**'],
        cwd: sourcePath,
    });

    watcher.on('unlink', (file) => {
        const { name, ext, dir, base } = path.parse(file);

        const isTypescript = ['.ts', '.tsx'].includes(ext);

        const destFilename = isTypescript ? `${name}.js` : base;

        const destPath = path.resolve(buildPath, dir, destFilename);
        const rootRelativePath = path.relative(rootPath, destPath);

        const destPathSourceMap = `${destPath}.map`;

        const removeFiles = [destPath, destPathSourceMap];

        if (flow === true) {
            const destPathSourceFlow = `${destPath}.flow`;
            removeFiles.push(destPathSourceFlow);
        }

        return del(removeFiles)
            .then(() => {
                log.info(`${rootRelativePath} deleted`);

                return undefined;
            })
            .catch((error) => {
                log.error(error);

                log.error(`${rootRelativePath} could not be deleted`);
            });
    });

    exitHook(() => {
        watcher.close();
    });
}

module.exports = watchDeleted;
