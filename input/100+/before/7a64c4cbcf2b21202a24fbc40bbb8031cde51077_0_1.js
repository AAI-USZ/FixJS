function(err, code) {
  var timestamp;
  if (options.watch) {
    timestamp = (new Date()).toLocaleTimeString();
    if (err) {
      return console.error("" + timestamp + "  - error: " + err);
    } else {
      console.info("" + timestamp + " - generated " + output);
      return fs.writeFile(output, code);
    }
  } else {
    if (err) {
      throw err;
    }
    return fs.writeFile(output, code);
  }
}