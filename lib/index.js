#! /usr/bin/env node
const path = require('path');

process.env.NODE_PATH = [
  ...(process.env.NODE_PATH || []),
  path.resolve(process.cwd(), 'node_modules'),
].join(':');

require('module').Module._initPaths();

let stix;
let app;

try {
  const { Application } = require('stix');
  const config = require(path.resolve(process.cwd(), 'dist', 'config', 'index'));

  stix = new Application(config);
  app = stix.launch('cli', true);
} catch (error) { }

if (process.env.COMP_LINE) {
  require('./autocomplete')(stix, app);
} else {
  require('./run')(app, stix);
}
