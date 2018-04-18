import _ from 'lodash';
import loadConf from 'load-conf';
import path from 'path';

export default function rcConfig(name, ignore = []) {
  if (!_.isArray(ignore)) ignore = [ignore];
  let config = {};
  if (!_.includes(ignore, 'yaml')) {
    config = _.merge(config, loadConf(path.resolve(`.${name}rc.yaml`), 'yaml'));
  }
  if (!_.includes(ignore, 'yml')) {
    config = _.merge(config, loadConf(path.resolve(`.${name}rc.yml`), 'yaml'));
  }
  if (!_.includes(ignore, 'json')) {
    config = _.merge(config, loadConf(path.resolve(`.${name}rc.json`), 'json'));
  }
  if (!_.includes(ignore, 'js')) {
    config = _.merge(
      config,
      loadConf(path.resolve(`.${name}rc.js`), 'javascript')
    );
  }
  if (!_.includes(ignore, 'rc')) {
    config = _.merge(config, loadConf(path.resolve(`.${name}rc`)));
  }
  if (!_.includes(ignore, 'package.json')) {
    config = _.merge(
      config,
      loadConf(path.resolve('package.json'), 'json')[name]
    );
  }
  return config;
}
