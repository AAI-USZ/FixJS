function(n) {
      var npath      = n.path
        , method     = n.method     || "get"
        , status     = n.status     || 200
        , response   = n.buffer
                     ? endsWith(n.buffer, '.png') 
                       ? helpers.loadFixture(n.buffer)
                       : new Buffer(n.buffer, 'base64')
                     : n.response || ""
        , headers    = n.headers    || {}
        , reqheaders = n.reqheaders || {}
        , body       = n.base64
                     ? new Buffer(n.base64, 'base64').toString()
                     : n.body       || ""
        ;

      if(typeof response === "string" && endsWith(response, '.json')) {
        response = helpers.loadFixture(path.join(fixture, response));
      }
      if(typeof headers === "string" && endsWith(headers, '.json')) {
        headers = helpers.loadFixture(path.join(fixture, headers));
      }

      if(body==="*") {
        nock(url).filteringRequestBody(function() {
          return "*";
        })[method](npath, "*").reply(status, response, headers);
      } else {
        var nk = nock(url);
        if(reqheaders !== {}) {
          for (var k in reqheaders) {
            nk = nk.matchHeader(k, reqheaders[k]);
          }
        }
        nk.intercept(npath, method, body).reply(status, response, headers);
      }
    }