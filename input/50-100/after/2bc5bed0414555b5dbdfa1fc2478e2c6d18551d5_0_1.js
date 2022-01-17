function (callback) {
    var stream;

    // append JSON seperator
    if (seperator) {
      output.write(',');
    }

    // append JSON property name
    output.write('"' + filepath + '":');

    // append source code content to output
    stream = self.compiler.read(filepath);
    stream.pipe(output, {end: false});
    stream.once('end', callback);
    stream.resume();
  }