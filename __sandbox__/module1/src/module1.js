/* @flow */

/**
 * module entry file
 */

// eslint-disable-next-line node/no-unsupported-features/es-syntax
async function hello() {
    await import('./other.js');

    const one = { one: 1 };
    const two = { two: 1 };

    return { ...one, ...two };
}

hello();
