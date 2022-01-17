function(req, res) {
      var clientCacheDiff, clientJs, filePath, parsedUrl;
      if (req.url === '/mundlejs/require.js') {
        clientJs = fs.readFileSync("" + __dirname + "/client.js");
        res.writeHead(200, {
          'Content-Type': 'text/javascript'
        });
        return res.end(clientJs);
      } else if ((req.url.search(/^\/mundlejs\//)) !== -1) {
        parsedUrl = url.parse(req.url.slice(9), true);
        filePath = parsedUrl.pathname.slice(1);
        clientCacheDiff = parsedUrl.query;
        return serverRequire(filePath, clientCacheDiff, function(err, results) {
          return res.end(JSON.stringify({
            err: err,
            results: results
          }));
        });
      }
    }