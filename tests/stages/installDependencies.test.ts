import { sep } from 'path';

import { exec } from '@actions/exec';
import { mocked } from 'jest-mock';

import { installDependencies } from '../../src/stages/installDependencies';
import { removeDirectory } from '../../src/utils/removeDirectory';

jest.mock('../../src/utils/removeDirectory');

const clearMocks = () => {
    mocked(exec).mockClear();
    mocked(removeDirectory).mockClear();
};

beforeEach(clearMocks);

describe('installDependencies', () => {
    it('should remove "node_modules" directory', async () => {
        await installDependencies();

        expect(removeDirectory).toHaveBeenCalledWith('node_modules');
    });

    it('should remove "node_modules" directory, which is under specified working directory', async () => {
        await installDependencies(undefined, 'workingDir');

        expect(removeDirectory).toHaveBeenCalledWith(
            `workingDir${sep}node_modules`
        );
    });

    it('should install dependencies', async () => {
        await installDependencies();

        expect(exec).toHaveBeenCalledWith('npm install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies using npm', async () => {
        await installDependencies('npm');

        expect(exec).toHaveBeenCalledWith('npm install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies using yarn', async () => {
        await installDependencies('yarn');

        expect(exec).toHaveBeenCalledWith('yarn install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies using pnpm', async () => {
        await installDependencies('pnpm');

        expect(exec).toHaveBeenCalledWith('pnpm install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies using bun', async () => {
        await installDependencies('bun');

        expect(exec).toHaveBeenCalledWith('bun install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies under specified working directory', async () => {
        await installDependencies(undefined, 'workingDir');

        expect(exec).toHaveBeenCalledWith('npm install', undefined, {
            cwd: 'workingDir',
        });
    });

    it("shouldn't install dependencies, if node_modules directory deletion failed", async () => {
        try {
            mocked(removeDirectory).mockImplementationOnce(() => {
                throw 0;
            });
            await installDependencies();
        } catch {
            /** ignore error */
        }

        expect(exec).not.toHaveBeenCalled();
    });
});
