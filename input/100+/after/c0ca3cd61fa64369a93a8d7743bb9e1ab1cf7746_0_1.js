function copyFile(src, callback) {
    var md5 = crypto.createHash('md5');
    md5.update(src);
    var hash = md5.digest('hex').substr(0, 10);
    require('util').pump(fs.createReadStream(src),
      fs.createWriteStream(options.destPath + '/' + hash + '-' + path.basename(src)), function(error) {
        callback(error, path.normalize(options.webPath + '/' + hash + '-' + path.basename(src)));
      });
  }