function (error, filepath) {
      if (error) return output.emit('error', error);

      var dependencies = self.build.dependencies[filepath];

      // don't inclide cached files
      dependencies = dependencies.filter(function (filepath) {
        return (cache.indexOf(filepath) === -1);
      });

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
          output.emit('close');
          return;
        }

        output.write('}');
        output.emit('end');
        output.emit('close');
      }    });
