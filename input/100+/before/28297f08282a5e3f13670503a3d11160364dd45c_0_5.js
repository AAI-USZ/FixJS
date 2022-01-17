function (error, filepath) {
    if (error) return output.emit('error', error);

    // get prebuild dependencies map
    var dependencies = dependenciesList(self, filepath, cache);

    // find the highest mtime
    var mtime = 0;
    var cacheTime = self.build.mtime;
    dependencies.forEach(function (filepath) {
      var time = cacheTime[filepath];
      if (mtime < time) {
        mtime = time;
      }
    });

    // set mtime info
    output.mtime = new Date(mtime);

    // since resolveModule can be sync, so just to be sure wait until next tick
    process.nextTick(function () {
      output.emit('ready');

      // compile an execution list
      var list = [];
      if (dependencies.length > 0) {
        list.push(appendModule(self, output, false, dependencies.shift()));
      }
      if (dependencies.length > 0) {
        list.push.apply(list, dependencies.map(appendModule.bind(null, self, output, true)));
      }

      // run it all
      async.series(list, function (error) {
        if (error) {
          output.emit('error', error);
          output.destroy();
          return;
        }

        output.end('</modules>');
      });
    });
  }