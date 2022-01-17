function(req, res) {

    if (!this.cacheRequests) {
      return false;
    }

    var cacheEntry = this.cache[req.url];

    if (cacheEntry) {
      console.log('Outputing cached entry for URL:', req.url);
      res.send(cacheEntry.body, cacheEntry.headers, cacheEntry.status);
      return true;
    }

    if (req.method === 'GET') {

      var send = res.send;

      res.send = function(body, headers, status){
        this.cache[req.url] = {
          body: body,
          headers: headers,
          status: status
        };
        send.apply(res, arguments);
      }.bind(this);
    }

    return false;
  }