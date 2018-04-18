import rcConfig from '../src';

describe('rcConfig', () => {
  it('should load and merge all config', async () => {
    const config = rcConfig('rcconfig');
    expect(config).toEqual({ howdy: 'texas', hello: 'world' });
  });
  it('should ignore ignore item', async () => {
    const config = rcConfig('rcconfig', 'package.json');
    expect(config).toEqual({ hello: 'world' });
  });
  it('should ignore ignore list', async () => {
    const config = rcConfig('rcconfig', ['package.json', 'rc']);
    expect(config).toEqual({});
  });
});
