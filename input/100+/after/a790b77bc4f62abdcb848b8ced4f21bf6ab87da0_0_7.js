function appendModule(self, output, seperator, filepath) {
  return function (callback) {
    var stream;

    // append JSON seperator
    if (seperator) {
      output.write(',');
    }

    // append JSON property name
    output.write('"' + filepath + '":');

    // append source code content to output
    stream = self.compiler.read(filepath);
    stream.on('data', output.write.bind(output));


    stream.on('error', function (error) {
      callback(error);
    });

    stream.once('end', function () {
      callback(null);
    });

    stream.resume();
  };
}