function () {
    style = { name: 'default', sourcePath: sourcePath };
    readStream = {};
    writeStream = {};
    pumped = {};

    proxnsh = proxyquire({
        fs: {
            createReadStream: function (p) { readStream.path = p;  return readStream; }
          , createWriteStream: function (p) { writeStream.path = p; return writeStream; }
        }
      , util: {
            pump: function (read, write, cb) { pumped.read = read; pumped.write = write; cb(); }
        }
      })
      .require('../node-syntaxhighlighter');
  }