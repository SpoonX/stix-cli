#! /usr/bin/env node
const path = require('path');

process.env.NODE_PATH = [
  ...(process.env.NODE_PATH || []),
  path.resolve(process.cwd(), 'node_modules'),
].join(':');

require('module').Module._initPaths();

const { Application } = require('stix');
const config = require(path.resolve(process.cwd(), 'dist', 'config', 'index'));

const stix = new Application(config);
const app = stix.launch('cli', true);

if (process.env.COMP_LINE) {
  require('./autocomplete')(stix, app);
} else {
  app.then(() => stix.start());
}
