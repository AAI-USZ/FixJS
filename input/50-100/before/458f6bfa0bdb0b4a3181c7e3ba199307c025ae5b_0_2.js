function readPackageJson(p) {
  var packageJson = p + '/package.json';
  if (!path.existsSync(packageJson)) {
    throw new Error('No index.js nor package.json found in ' + p);
  }
  var json = fs.readFileSync(packageJson).toString();
  return JSON.parse(json);
}