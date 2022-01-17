function (err, stats) {
      self.stat = stats
      if (err && err.code === 'ENOENT' && !self.dest && !self.src) self.src = self.path
      if (err && !self.dest && !self.src) return self.emit('error', err)
      if (err && self.dest && !self.dest.writeHead) return self.emit('error', err)

      // See if writes are disabled
      if (self.src && self.src.method &&
          !self.writable && self.dest.writeHead &&
          (self.src.method === 'PUT' || self.src.method === 'POST')) {
        self.dest.writeHead(405, {'content-type':'text/plain'})
        self.dest.end(self.src.method+' Not Allowed')
        return
      }

      if (!err) {
        self.etag = crypto.createHash('md5').update(stats.ino+'/'+stats.mtime+'/'+stats.size).digest("hex")
        self.lastmodified = rfc822.getRFC822Date(stats.mtime)
      }

      process.nextTick(function () {
        stopBuffering()
      })

      // 404 and 500
      if ( err && self.dest && self.dest.writeHead && // We have an error object and dest is an HTTP response
           ( // Either we have a source and it's a GET/HEAD or we don't have a src
             (self.src && (self.src.method == 'GET' || self.src.method === 'HEAD')) || (!self.src)
           )
         ) {
        if (err.code === 'ENOENT') {
          self.dest.statusCode = 404
          self.dest.end('Not Found')
        } else {
          self.dest.statusCode = 500
          self.dest.end(err.message)
        }
        return
      }

      // Source is an HTTP Server Request
      if (self.src && (self.src.method === 'GET' || self.src.method === 'HEAD') && self.dest) {
        if (self.dest.setHeader) {
          self.dest.setHeader('content-type', self.mimetype)
          self.dest.setHeader('etag', self.etag)
          self.dest.setHeader('last-modified', self.lastmodified)
        }

        if (self.dest.writeHead) {
          if (self.src && self.src.headers) {
            if (self.src.headers['if-none-match'] === self.etag ||
                // Lazy last-modifed matching but it's faster than parsing Datetime
                self.src.headers['if-modified-since'] === self.lastmodified) {
              self.dest.statusCode = 304
              self.dest.end()
              return
            }
          }
          // We're going to return the whole file
          self.dest.statusCode = 200
          self.dest.setHeader('content-length', stats.size)
        } else {
          // Destination is not an HTTP response, GET and HEAD method are not allowed
          return
        }
        
        if (self.src.method !== 'HEAD') {
          fs.createReadStream(self.path).pipe(self)
        }
        return
      }
      
      if (self.src && (self.src.method === 'PUT' || self.src.method === 'POST')) {
        if (!err) {
          // TODO handle overwrite case
          return
        }
        stream.Stream.prototype.pipe.call(self, fs.createWriteStream(self.path))
        if (self.dest && self.dest.writeHead) {
          self.on('end', function () {
            self.dest.statusCode = 201
            self.dest.setHeader('content-length', 0)
            self.dest.end()
          })
        }
        return
      }
      
      // Desination is an HTTP response, we already handled 404 and 500
      if (self.dest && self.dest.writeHead) {
        self.dest.statusCode = 200
        self.dest.setHeader('content-type', self.mimetype)
        self.dest.setHeader('etag', self.etag)
        self.dest.setHeader('last-modified', self.lastmodified)
        self.dest.setHeader('content-length', stats.size)
        fs.createReadStream(self.path).pipe(self)
        return
      }

      // Destination is not an HTTP request

      if (self.src && !self.dest) {
        stream.Stream.prototype.pipe.call(self, fs.createWriteStream(self.path))
      } else if (self.dest && !self.src) {
        fs.createReadStream(self.path).pipe(self)
      }
    }