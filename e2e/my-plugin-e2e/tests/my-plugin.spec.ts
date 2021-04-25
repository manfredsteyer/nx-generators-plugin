import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('my-plugin e2e', () => {
  it('should create my-plugin', async (done) => {
    const plugin = uniq('my-plugin');
    ensureNxProject('@my-org/my-plugin', 'dist/packages/my-plugin');
    await runNxCommandAsync(`generate @my-org/my-plugin:my-plugin ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('my-plugin');
      ensureNxProject('@my-org/my-plugin', 'dist/packages/my-plugin');
      await runNxCommandAsync(
        `generate @my-org/my-plugin:my-plugin ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('my-plugin');
      ensureNxProject('@my-org/my-plugin', 'dist/packages/my-plugin');
      await runNxCommandAsync(
        `generate @my-org/my-plugin:my-plugin ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
