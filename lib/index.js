#! /usr/bin/env node
const path = require('path');

process.env.NODE_PATH = [
  ...(process.env.NODE_PATH || []),
  path.resolve(process.cwd(), 'node_modules'),
].join(':');

require('module').Module._initPaths();


if (process.argv[2] === 'init') {
  if (!process.argv[3]) {
    return console.log('Project name missing.');
  }

  return require('./init')(process.argv[3]);
}

const { Application } = require('stix');
const config = require(path.resolve(process.cwd(), 'dist', 'config', 'index'));

const stix = new Application(config);
const app = stix.launch('cli', true);

if (process.env.COMP_LINE) {
  require('./autocomplete')(stix, app);
} else {
  app.then(() => stix.start());
}
