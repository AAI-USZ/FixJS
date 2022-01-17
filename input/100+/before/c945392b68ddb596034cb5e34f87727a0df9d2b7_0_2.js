function (modulename, cache) {
  var self = this;
  var output;

  // default cache to no cache
  cache = [];

  // open or append to stream
  output = flower.relayReadStream();
  output.pause();

  // wrap resume so we will first begin writing when ready
  var resume = output.resume;
  output.resume = function () {

    // call the real resume, and call only that in the future
    resume.call(this);
    output.resume = resume;

    output.write('{');

    self.resolveModule('/', modulename, function (error, filepath) {
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
      });
    });

  }

  return output;
}