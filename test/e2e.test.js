const { run } = require('./run');

describe('end-to-end integration', () => {
  test('when no arguments passed prints error and help message', async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual('');
  });

  test('when argument --help is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('--help');
    expect(exitCode).toBe(1);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });
});
