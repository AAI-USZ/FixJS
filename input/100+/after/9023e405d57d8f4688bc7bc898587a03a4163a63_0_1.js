function (req, callback) {
  req.headers = req.headers || { };
  if (this.Authorization) {
    req.headers.Authorization = this.Authorization;
  }
  if (req.json) {
    var oldToJSONfunction = Date.prototype.toJSON;
    // Added to make dates format to ISO8601 
    Date.prototype.toJSON = function (key) {
        function pad(n) { return n < 10 ? '0' + n : n }
        
        return this.getUTCFullYear() + '-'
        + pad(this.getUTCMonth() + 1) + '-'
        + pad(this.getUTCDate()) + 'T'
        + pad(this.getUTCHours()) + ':'
        + pad(this.getUTCMinutes()) + ':'
        + pad(Math.floor(this.getUTCSeconds())) + '.0000000Z' // VERY strange. RavenDB seems to demand to have exactly 7 digits in decimal part for a valid date..
    };
    req.body = JSON.stringify(req.json);
    Date.prototype.toJSON = oldToJSONfunction;

    delete req.json;
    req.headers['content-type'] = 'application/json; charset=utf-8';
    req.headers.accept = 'application/json';
  }
  // Uncomment to test with fiddler  
  //  req.proxy = 'http://localhost:8888'
  request(req, handleResponse(this, req, callback));
}