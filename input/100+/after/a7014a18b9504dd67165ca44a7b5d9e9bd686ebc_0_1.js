function(request, response) {
    if (request.method == 'GET') {
      // file path in current directory
      var path = '.' + request.url.split('?')[0];
      var mimeType = mime.lookup(path, 'text/plain');
      var charset = mime.charsets.lookup(mimeType, '');
      var binary = charset !== 'UTF-8';

      // redirect /nodefront/live.js request to nodefront's live.js
      if (live && path === './nodefront/live.js') {
        path = pathLib.resolve(__dirname + '/../live.js');
      }
      
      // if file exists, serve it; otherwise, return a 404
      utils.readFile(path, binary)
        .then(function(contents) {
          // find this file's mime type or default to text/plain
          response.writeHead(200, {'Content-Type': mimeType});

          if (live && mimeType === 'text/html') {
            // add scripts before end body tag
            contents = contents.replace('</body>', scripts + '</body>');

            // if no end body tag is present, just append scripts
            if (contents.indexOf(scripts) === -1) {
              contents = contents + scripts;
            }
          }

          if (binary) {
            response.end(contents, 'binary');
          } else {
            response.end(contents);
          }
        }, function(err) {
          response.writeHead(404, {'Content-Type': 'text/plain'});
          response.end('File not found.');
        })
        .end();
    } else {
      // bad request error code
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.end('Unsupported request type.');
    }
  }