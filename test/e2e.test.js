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
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('when argument -h is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('-h');
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('when argument -j without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('-j');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });

  test('when argument -f without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('-f');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });

  test('when argument --file without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('--file');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });

  test('when argument -j -f without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('-j -f');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });

  test('when argument --json -f without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('--json -f');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });

  test('when argument --json --file without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('--json --file');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });

  test('when argument -j --file without file is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('-j --file');
    expect(exitCode).toBe(1);
    expect(stdout).toEqual('');
    expect(stderr).toMatchSnapshot();
  });
});
