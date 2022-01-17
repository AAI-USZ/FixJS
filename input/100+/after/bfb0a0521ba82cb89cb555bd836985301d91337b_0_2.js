function (dir, callback) {
  var help = [
    '',
    'A package.json stores meta-data about your application',
    'In order to continue we\'ll need to gather some information about your app',
    '',
    'Press ^C at any time to quit.',
    'to select a default value, press ENTER'
  ];

  jitsu.log.warn('There is no package.json file in ' + dir.grey);
  jitsu.log.warn('Creating package.json at ' + (path.join(dir, '/package.json')).grey);

  help.forEach(function (line) {
    jitsu.log.help(line);
  });

  fillPackage(null, dir, function (err, pkg) {
    if (err) {
      return callback(err);
    }
    
    package.write(pkg, dir, true, function (err, pkg) {
      if (err) {
        return callback(err);
      }
      tryAnalyze(pkg, dir, callback);

    });
  });
}