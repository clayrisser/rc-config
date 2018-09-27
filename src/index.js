import _ from 'lodash';
import loadConf from 'load-conf';
import path from 'path';
import pkgDir from 'pkg-dir';

export default function rcConfig({
  config = {},
  count = 0,
  ignore = [],
  name,
  order = [],
  strategy = 'first',
  type,
  cwd = pkgDir.sync(process.cwd())
}) {
  if (!_.isArray(order)) order = [order];
  if (!_.isArray(ignore)) ignore = [ignore];
  order = _.uniq([
    ...order,
    ...['rc', 'js', 'json', 'yml', 'yaml', 'package.json']
  ]);
  if (count > order.length) return config;
  if (!type) {
    return rcConfig({
      config,
      count: count + 1,
      ignore,
      name,
      order,
      strategy,
      type: order[count]
    });
  }
  let currentConfig = null;
  switch (type) {
    case 'yaml':
      if (!_.includes(ignore, 'yaml')) {
        currentConfig = loadConf(
          path.resolve(cwd, `.${name}rc.yaml`),
          null,
          'yaml'
        );
      }
      break;
    case 'yml':
      if (!_.includes(ignore, 'yml')) {
        currentConfig = loadConf(
          path.resolve(cwd, `.${name}rc.yml`),
          null,
          'yaml'
        );
      }
      break;
    case 'json':
      if (!_.includes(ignore, 'json')) {
        currentConfig = loadConf(
          path.resolve(cwd, `.${name}rc.json`),
          null,
          'json'
        );
      }
      break;
    case 'js':
      if (!_.includes(ignore, 'js')) {
        currentConfig = loadConf(
          path.resolve(cwd, `.${name}rc.js`),
          null,
          'javascript'
        );
      }
      break;
    case 'rc':
      if (!_.includes(ignore, 'rc')) {
        currentConfig = loadConf(path.resolve(cwd, `.${name}rc`), null);
      }
      break;
    case 'package.json':
      if (!_.includes(ignore, 'package.json')) {
        currentConfig = loadConf(path.resolve(cwd, 'package.json'), {}, 'json')[
          name
        ];
      }
      break;
  }
  if (currentConfig) {
    switch (strategy) {
      case 'first':
        return currentConfig;
      case 'merge':
        return rcConfig({
          config: _.merge(config, currentConfig),
          count: count + 1,
          ignore,
          name,
          order,
          strategy,
          type: order[count]
        });
      default:
        throw new Error(`strategy '${strategy}' is invalid`);
    }
  }
  return rcConfig({
    config,
    count: count + 1,
    ignore,
    name,
    order,
    strategy,
    type: order[count]
  });
}
