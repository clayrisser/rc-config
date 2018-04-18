import rcConfig from '../src';

describe('rcConfig', () => {
  it('should load and merge all config', async () => {
    const config = rcConfig('rcconfig');
    expect(config).toEqual({ howdy: 'texas', hello: 'world' });
  });
});
