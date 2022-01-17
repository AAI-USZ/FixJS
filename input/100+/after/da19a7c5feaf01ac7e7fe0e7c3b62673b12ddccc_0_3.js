function buildAllPackages() {
  var concatBuilds = {};
  _.each(packageJSON.builds, function(build, name) {
    if (build.sources && build.target) {
      concatBuilds[name] = build;
    }
  });
  
  var builds = _.clone(packageJSON.builds);
  _.keys(concatBuilds).forEach(function(key) {
    delete builds[key]
  });

  buildConcatBuilds(concatBuilds, function() {
    //console.log('will build ',builds)
    async.forEachSeries(_.map(builds, function(build, name) {
      return {
        name: name,
        build: build
      };
    }), function(item, next) {
      var build = item.build;
      var name = item.name;
      var targetDirectory = path.join(__dirname, '..', 'public', 'builds', name);
      execute(['rm -rf ' + targetDirectory], function() {
        mkdirp(targetDirectory, function() {
          buildPackage(name, targetDirectory, function() {
            var lumbarJSONLocation = path.join(targetDirectory, 'lumbar.json');
            if (path.existsSync(lumbarJSONLocation)) {
              saveLumbarJSONForTarget(lumbarJSONLocation);
            }
            var packageJSONLocation = path.join(targetDirectory, 'package.json');
            if (path.existsSync(packageJSONLocation)) {
              savePackageJSONForTarget(packageJSONLocation);
            }
            execute(['zip ' + targetDirectory + '.zip -r ' + targetDirectory], function() {
              console.log('built', name);
              next();
            });
          });
        });
      });
    });
  });
}