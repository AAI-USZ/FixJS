function(service, params, method, id, data)
    {
      var config = this._getService(service);

      var url;
      try {
        url = this.__patchUrl(config.url, params);
      }
      catch(ex)
      {
        this.warn("Unable to communicate with service: " + service);
        this.warn("Parameter/Configuration problem: " + ex);
        return false;
      }

      // Create request object
      var req = new lowland.bom.Xhr();
      req.setDomainRequest(this.getDomainRequest());
      req.setUrl(url);

      var requestHeaders = req.getRequestHeaders() || {};
      // Sync mime type
      requestHeaders.Accept = this.getResponseType();

      // Sync timeout
      req.setTimeout(this.getTimeout()*1000);

      // Enable load cache
      if (method == "GET")
      {
        req.setCache(true);
        if (this.getEnableCacheRefresh()) {
          var cacheModified = this.getCachedField(service, params, "modified");
          if (cacheModified != null) {
            unify.business.SyncRegistry.sync(url, cacheModified);
            requestHeaders["If-Modified-Since"] = cacheModified;
          } else {
            unify.business.SyncRegistry.clear(url);
            requestHeaders["If-Modified-Since"] = "Thu, 01 Jan 1970 00:00:00 GMT"
          }
        }
      }

      // Apply method
      if (method != null && method != "GET") {
        req.setMethod(method);
      }

      // Support for authentification methods
      var auth = this.getAuthMethod();
      if (auth == "basic") {
        var key = this.getEnableProxy() ? "X-Proxy-Authorization" : "Authorization";
        var value = "Basic " + lowland.util.Base64.encode(this.getUser() + ":" + this.getPassword());

        requestHeaders[key] = value;
      }

      // Add custom headers
      var headers = this.__headers;
      for (var name in headers) {
        requestHeaders[name] = headers[name];
      }

      // Add post data
      if (method == "POST")
      {
        var reqType = this.getRequestType();
        if (reqType == "application/json" && typeof data != "string") {
          data = JSON.stringify(data);
        }

        requestHeaders["Content-Type"] = reqType;
        req.setRequestData(data);
      }

      // Add listeners
      /*req.addListener("load", this.__onRequestDone, this);
      req.addListener("error", this.__onRequestDone, this);
      req.addListener("timeout", this.__onRequestDone, this);*/
      req.addListener("done", this.__onRequestDone, this);

      // Attach incoming data to request
      req.setUserData("service", service);
      req.setUserData("params", params);

      // Every request has a unique identifier
      req.setUserData("id", id);
      if (core.Env.getValue("debug")) {
        this.debug("Sending request to: " + service + "[id=" + id + "]...");
      }

      req.setRequestHeaders(requestHeaders);
      // Finally send request
      req.send();

      return id;
    }