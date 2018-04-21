import rcConfig from '../src';

describe('rcConfig', () => {
  it('should load and merge all config', async () => {
    const config = rcConfig({ name: 'rcconfig' });
    expect(config).toEqual({ hello: 'world' });
  });
  it('should reorder', async () => {
    const config = rcConfig({ name: 'rcconfig', order: 'package.json' });
    expect(config).toEqual({ howdy: 'texas' });
  });
  it('should ignore ignore list', async () => {
    const config = rcConfig({
      name: 'rcconfig',
      ignore: ['package.json', 'rc']
    });
    expect(config).toEqual({});
  });
  it('should merge list', async () => {
    const config = rcConfig({
      name: 'rcconfig',
      strategy: 'merge'
    });
    expect(config).toEqual({ hello: 'world', howdy: 'texas' });
  });
});
