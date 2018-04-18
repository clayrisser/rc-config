import _ from 'lodash';
import loadConf from 'load-conf';
import path from 'path';

export default function rcConfig(name) {
  let config = _.merge(
    config,
    loadConf(path.resolve(`.${name}rc.yaml`), 'yaml')
  );
  config = _.merge(config, loadConf(path.resolve(`.${name}rc.yml`), 'yaml'));
  config = _.merge(config, loadConf(path.resolve(`.${name}rc.json`), 'json'));
  config = _.merge(
    config,
    loadConf(path.resolve(`.${name}rc.js`), 'javascript')
  );
  config = _.merge(config, loadConf(path.resolve(`.${name}rc`)));
  config = _.merge(
    config,
    loadConf(path.resolve('package.json'), 'json')[name]
  );
  return config;
}
