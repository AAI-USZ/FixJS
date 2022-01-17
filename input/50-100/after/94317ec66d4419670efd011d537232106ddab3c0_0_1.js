function(err, req, res) {
      console.error(err);
      if(err.code == 'ECONNREFUSED') {
        console.error('Unable to proxy to target server. This probably means the target server '+
                    'is not listening on the given port or host');
      }
      res.writeHead(500, {'Content-type': 'text/html'});
      res.end('<h3> Internal Server Error </h3> Well this is embarrassing. Please try again.');
    }