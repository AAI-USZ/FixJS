function (error, filepath) {
      if (error) return output.emit('error', error);

      var dependencies = self.build.dependencies[filepath];

      // compile an execution list
      var list = [];
      list.push(appendModule(self, output, false, dependencies.shift()));
      list.push.apply(list, dependencies.map(appendModule.bind(null, self, output, true)));

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
