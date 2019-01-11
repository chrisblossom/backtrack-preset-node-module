const path = require('path');
const cwd = process.cwd();

const typescriptModule = () => require('./typescript-module')();

beforeEach(() => {
})

afterEach(() => {
    process.chdir(cwd);
})

test('works', () => {
    process.chdir(path.resolve(__dirname, 'nested'));
    const result = typescriptModule();
    expect(result).toEqual(1);
});

export {};
