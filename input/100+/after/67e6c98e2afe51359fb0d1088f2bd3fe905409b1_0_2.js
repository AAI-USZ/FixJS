function(request, response) {
  var self = this,
    requestParams = url.parse(request.url, true),
    uri = requestParams.pathname,
    host = request.headers.host.split(":")[0] || "localhost";


  this.getPackageFile(uri, function(exists, filename) {
    if(!exists) {
      return response.writeError(404, "Not Found");
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        return response.writeError(500, err);
      }

      response.writeHead(200, {
        "content-type": mimeTypes[filename.split(".").pop()] || mimeTypes.txt
      });


      if(filename.indexOf(self.main) >= 0) {
        response.end(self.buildMain(file, requestParams.query));
      }
      else {
        response.end(file, "binary");
      }
    });
  });
}