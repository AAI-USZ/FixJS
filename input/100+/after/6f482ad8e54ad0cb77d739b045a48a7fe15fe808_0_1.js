function(port, args, binaryPath) {
    var ps;
    ps = child.spawn(binaryPath, args.concat([__dirname + '/shim.js', port]));
    ps.stdout.on('data', function(data) {
      return console.log("phantom stdout: " + data);
    });
    ps.stderr.on('data', function(data) {
      if (data.toString('utf8').match(/No such method.*socketSentData/)) {
        return;
      }
      return console.warn("phantom stderr: " + data);
    });
    return ps;
  }