function(done) {
    imgBuf = fs.readFileSync('test/files/folder/Alice-white-rabbit.jpg');
    var stalwartHandler = stalwart('test/files', {recursive: true});
    http.createServer(function(req, res) {
      stalwartHandler(req, res, function() {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('file not found');
        res.end();
      });
    }).listen(port, done);
  }