import { rm, rmdir } from 'fs-extra';
import { mocked } from 'jest-mock';

import { removeDirectory } from '../../src/utils/removeDirectory';

const originalProcess = process;

beforeEach(() => {
    mocked(rm).mockClear();
    mocked(rmdir).mockClear();
});

afterEach(() => {
    global.process = originalProcess;
});

describe('removeDirectory', () => {
    it('should call rmdir when node version is < 14.14.0', async () => {
        global.process = {
            ...originalProcess,
            version: 'v14.3.9',
        };
        await removeDirectory('asdf');
        expect(rm).not.toHaveBeenCalled();
        expect(rmdir).toHaveBeenCalled();
    });

    it('should call rm when node version is >=14.14.0', async () => {
        global.process = {
            ...originalProcess,
            version: 'v14.14.0',
        };
        await removeDirectory('asdf');
        expect(rm).toHaveBeenCalled();
        expect(rmdir).not.toHaveBeenCalled();
    });
});
