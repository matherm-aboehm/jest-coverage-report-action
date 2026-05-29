import { exec } from '@actions/exec';

import { runTest } from '../../src/stages/runTest';

const clearMocks = () => {
    (exec as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('runTest', () => {
    it('should run test script', async () => {
        await runTest('npm run test');

        expect(exec).toHaveBeenCalledWith(
            'npm run test -- --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
    });

    it('should run test script in custom working directory', async () => {
        await runTest('npm run test', 'custom cwd');

        expect(exec).toHaveBeenCalledWith(expect.any(String), [], {
            cwd: 'custom cwd',
        });
    });
});
