function downloadFile(url, fileName, toPath, next) {

  var u = require('url'), fs = require('fs'), path = require('path');
  var parts = u.parse(url);

  // Ensure we have our download folder
  var tmpFolder = toPath;

  if(!path.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder, 0755);
  }

  if(parts.protocol === 'https:') {
    client = require('https');
  } else {
    client = require('http');
    if(!parts.port) {
      parts.port = 80;
    }
  }

  console.log("\r\nResolving file location, and downloading ...".cyan);

  client.get({ host: parts.hostname, port: parts.port, path: parts.pathname }, function(res) {

      if(res.statusCode === 302) {
        console.log("Redirecting to ".grey + res.headers.location.grey + " ...".grey);
        downloadFile(res.headers.location,fileName,toPath,next);
        return;
      }

      if(res.statusCode === 200) {

        var tmpFile = tmpFolder + fileName + '.zip';
        var fd = fs.openSync(tmpFile, 'w');
        var size = 0;
        var totalSize = parseInt(res.headers['content-length']);
        var progress = 0;

        res.on('data', function (chunk) {
          size += chunk.length;
          progress = showProgress(size,totalSize,progress);
          fs.writeSync(fd, chunk, 0, chunk.length, null);
        });

        res.on('end',function(){
            process.stdout.write("\n\n");
            fs.closeSync(fd);
            next(null,tmpFile);
        });

      } else {

        next(new Error("Unable to download file, status was " + res.statusCode));

      }

  }).on('error', function(err) {

    next(err);

  });

}