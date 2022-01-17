function() {
    var filename, random, timestamp, tmpdir, _ref;
    tmpdir = (_ref = process.env.TMPDIR) != null ? _ref : "/tmp";
    timestamp = new Date().getTime();
    random = parseInt(Math.random() * Math.pow(2, 16));
    filename = "pow." + process.pid + "." + timestamp + "." + random;
    return path.join(tmpdir, filename);
  }