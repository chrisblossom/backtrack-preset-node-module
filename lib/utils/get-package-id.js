'use strict';

const readPkg = require('read-pkg');

let packageId = null;

function getPackageId() {
    if (packageId !== null) {
        return packageId;
    }

    // get package name for entry file name
    const pkgName = readPkg.sync({ normalize: false }).name;

    // remove scope from packageId
    packageId = pkgName.split('/').pop();

    return packageId;
}

module.exports = getPackageId;
