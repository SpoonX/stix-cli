const { Git, File, Package } = require('tape-roller');
const path = require('path');

module.exports = async (name) => {
  const project = path.resolve(process.cwd(), name);

  await Git.clone('https://github.com/SpoonX/stix-skeleton.git', name, process.cwd());
  await File.remove(path.resolve(project, `.git`), true);
  await Package.install(project);
};
