function (pathStr) {
  var databaseJson = JSON.parse(fs.readFileSync(pathStr).toString());
  var env = exports.env || databaseJson['default'];
  var opts = databaseJson[env];
  opts.sqlDir = path.join(path.dirname(pathStr), opts.sqlDir || 'sql');
  setDefaultConnectOptions(opts);
  databaseJsonLoaded = true;
}