function (response) {
    self.response = response
    response.request = self

    if (self.httpModule === https &&
        self.strictSSL &&
        !response.client.authorized) {
      var sslErr = response.client.authorizationError
      self.emit('error', new Error('SSL Error: '+ sslErr))
      return
    }

    if (self.setHost) delete self.headers.host
    if (self.timeout && self.timeoutTimer) {
        clearTimeout(self.timeoutTimer);
        self.timeoutTimer = null;
    }  
    
    if (response.headers['set-cookie'] && (!self._disableCookies)) {
      response.headers['set-cookie'].forEach(function(cookie) {
        if (self._jar) self._jar.add(new Cookie(cookie))
        else cookieJar.add(new Cookie(cookie))
      })
    }

    if (response.statusCode >= 300 && response.statusCode < 400  &&
        (self.followAllRedirects ||
         (self.followRedirect && (self.method !== 'PUT' && self.method !== 'POST'))) &&
        response.headers.location) {
      if (self._redirectsFollowed >= self.maxRedirects) {
        self.emit('error', new Error("Exceeded maxRedirects. Probably stuck in a redirect loop."))
        return
      }
      self._redirectsFollowed += 1

      if (!isUrl.test(response.headers.location)) {
        response.headers.location = url.resolve(self.uri.href, response.headers.location)
      }
      self.uri = response.headers.location
      self.redirects.push(
        { statusCode : response.statusCode
        , redirectUri: response.headers.location 
        }
      )
      self.method = 'GET'; // Force all redirects to use GET
      delete self.req
      delete self.agent
      delete self._started
      if (self.headers) {
        delete self.headers.host
      }
      if (log) log('Redirect to %uri', self)
      self.init()
      return // Ignore the rest of the response
    } else {
      self._redirectsFollowed = self._redirectsFollowed || 0
      // Be a good stream and emit end when the response is finished.
      // Hack to emit end on close because of a core bug that never fires end
      response.on('close', function () {
        if (!self._ended) self.response.emit('end')
      })

      if (self.encoding) {
        if (self.dests.length !== 0) {
          console.error("Ingoring encoding parameter as this stream is being piped to another stream which makes the encoding option invalid.")
        } else {
          response.setEncoding(self.encoding)
        }
      }

      self.dests.forEach(function (dest) {
        self.pipeDest(dest)
      })

      response.on("data", function (chunk) {
        self._destdata = true
        self.emit("data", chunk)
      })
      response.on("end", function (chunk) {
        self._ended = true
        self.emit("end", chunk)
      })
      response.on("close", function () {self.emit("close")})

      self.emit('response', response)

      if (self.onResponse) {
        self.onResponse(null, response)
      }
      if (self.callback) {
        var buffer = []
        var bodyLen = 0
        self.on("data", function (chunk) {
          buffer.push(chunk)
          bodyLen += chunk.length
        })
        self.on("end", function () {
          if (buffer.length && Buffer.isBuffer(buffer[0])) {
            var body = new Buffer(bodyLen)
            var i = 0
            buffer.forEach(function (chunk) {
              chunk.copy(body, i, 0, chunk.length)
              i += chunk.length
            })
            if (self.encoding === null) {
              response.body = body
            } else {
              response.body = body.toString()
            }
          } else if (buffer.length) {
            response.body = buffer.join('')
          }

          if (self.json) {
            try {
              response.body = JSON.parse(response.body)
            } catch (e) {}
          }

          self.callback(null, response, response.body)
        })
      }
    }
  }