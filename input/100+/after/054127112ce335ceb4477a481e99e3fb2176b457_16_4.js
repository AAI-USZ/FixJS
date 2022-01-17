function () {
          if (self._aborted) return
          
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

          if (self._json) {
            try {
              response.body = JSON.parse(response.body)
            } catch (e) {}
          }

          self.callback(null, response, response.body)
        }