function copyFile(src, callback) {
    require('util').pump(fs.createReadStream(src),
      fs.createWriteStream(options.destPath + '/' + path.basename(src)), function(error) {
        callback(error, path.normalize(options.webPath + '/' + path.basename(src)));
      });
  }