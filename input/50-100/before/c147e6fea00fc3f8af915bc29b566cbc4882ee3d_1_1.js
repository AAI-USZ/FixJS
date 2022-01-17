function() {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('file not found');
        res.end();
      }