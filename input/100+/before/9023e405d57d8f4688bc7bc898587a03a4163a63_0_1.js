function (req, callback) {
  req.headers = req.headers || { };
  if (this.Authorization) {
    req.headers.Authorization = this.Authorization;
  }
  if (req.json) {
    req.body = JSON.stringify(req.json);
    delete req.json;
    req.headers['content-type'] = 'application/json; charset=utf-8';
    req.headers.accept = 'application/json';
  }
  // Uncomment to test with fiddler  
  //req.proxy = 'http://localhost:8888'
  request(req, handleResponse(this, req, callback));
}