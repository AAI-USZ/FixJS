function finished(err) {
  abortIf(err);
  delete require.cache[require.resolve('./node_modules/deployd/package')];

  var newPackage = require('./node_modules/deployd/package'),
      version = newPackage.version;

  echo("Installed Deployd version " + version);
  end(0);
}