function (/* method [uri, data, params] */) {
  var self    = this,
      args    = Array.prototype.slice.call(arguments),
      method  = args.shift(),
      uri     = typeof args[0] === 'string' && args.shift(),
      data    = typeof args[0] === 'object' && args.shift(),
      params  = typeof args[0] === 'object' && args.shift(),
      port    = this.port && this.port !== 80 ? ':' + this.port : '',
      fullUri,
      outgoing = {
        json: params.json || false,
        uri: null,
        body: null,
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

  // Merge 'current' request options for current request
  _.extend(outgoing, _frisbyGlobalSetup, this.current.request);

  // Ensure we have at least one 'content-type' header
  if(typeof outgoing.headers['Content-Type'] === "undefined") {
    outgoing.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  // Set outgoing URI
  outgoing.uri = uri;

  //
  // If the user has provided data, assume that it is query string
  // and set it to the `body` property of the options.
  //
  if (data) {
    // if JSON data
    if(outgoing.json) {
      outgoing.headers['Content-Type'] = 'application/json';
      outgoing.body = JSON.stringify(data);
    } else {
      // Default to 'application/x-www-form-urlencoded'
      outgoing.body = qs.stringify(data);
    }
  }

  //
  // Set the `uri` and `method` properties of the request options `outgoing`
  // using the information provided to this instance and `_request()`.
  //
  outgoing.method = method;

  //
  // Store outgoing request on current Frisby object for inspection if needed
  //
  this.current.outgoing = outgoing;

  //
  // Create the description for this test based on the METHOD and URL
  //
  this.current.itInfo = method.toUpperCase() + ' ' + outgoing.uri;

  //
  // Determine test runner function (request or provided mock)
  //
  var runner = params.mock || request;

  //
  // Add the topic for the specified request to the context of the current
  // batch used by this suite.
  //
  this.current.it = function () {
    self.currentRequestFinished = false;
    var start = (new Date).getTime();
    runner(outgoing, function(err, res, body) {

      // Throw exception on error to prevent cryptic messages
      if(err) {
        var e = new Error("Destination URL may be down or URL is invalid.\nTrying: '" + self.current.outgoing.method.toUpperCase() + " " + self.current.outgoing.uri + "'\nGot: '" + err + "'\n");
        if(self.exceptionHandler()) {
          self._exceptionHandler.call(self, e);
        } else {
          throw e;
        }
      }

      var diff = (new Date).getTime() - start;

      self.currentRequestFinished = {err: err, res: res, body: body, req: outgoing};

      // Store relevant current response parts
      self.current.response = {
        error: err,
        status: (res ? res.statusCode : 500),
        headers: (res ? res.headers : {}),
        body: body,
        time: diff
      };
    });
  };

  this._setup = globalSetup();

  return this;
}