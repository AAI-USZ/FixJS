function () {

    // call the real resume, and call only that in the future
    resume.call(this);
    output.resume = resume;

    output.write('{');

    // resolve the modulename
    self.resolveModule('/', modulename, function (error, filepath) {
      if (error) return output.emit('error', error);

      // append the module and all its dependencies to the output stream
      appendModule(self, output, filepath, cache, false, function (error) {
        if (error) return output.emit('error', error);

        // end JSON output
        output.write('}');

        // close stream
        output.emit('end');
        output.emit('close');
      });
    });
  }