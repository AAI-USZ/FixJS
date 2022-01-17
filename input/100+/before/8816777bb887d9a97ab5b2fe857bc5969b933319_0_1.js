function() {
    ended = true;
    var encoding
      , requestBody
      , responseBody
      , interceptor
      , paused
      , next = []
      , callnext;

    requestBody = requestBodyBuffers.map(function(buffer) {
      return buffer.toString(encoding);
    }).join('');
    body = undefined; // we don't need the request body buffers any more
    
    interceptors = interceptors.filter(function(interceptor) {
      return interceptor.match(options, requestBody);
    });
    
    console.log('interceptors length:', interceptors.length);
    if (interceptors.length < 1) { throw new Error("Nock: No match for HTTP request " + stringifyRequest(options)); }
    interceptor = interceptors.shift();

    response.statusCode = interceptor.statusCode || 200;
    response.headers = interceptor.headers || {};
    response.readable = true;
    responseBody = interceptor.body;
    if (! Buffer.isBuffer(responseBody)) {
      responseBody = new Buffer(responseBody);
    }
    response.setEncoding = function(newEncoding) {
      encoding = newEncoding;
    };
    remove(interceptor);
    interceptor.discard();

    if (aborted) { return; }

    response.pause = function() {
      paused = true;
    };

    response.resume = function() {
      paused = false;
      callnext();
    };

    response.pipe = function(dest, options) {
      var source = this;

      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk)) source.pause();
        }
      }

      function ondrain() {
        if (source.readable) source.resume();
      }

      source.on('data', ondata);
      dest.on('drain', ondrain);

      // If the 'end' option is not supplied, dest.end() will be called when
      // source gets the 'end' or 'close' events.  Only dest.end() once, and
      // only when all sources have ended.
      if (!options || options.end !== false) {
        dest._pipeCount = dest._pipeCount || 0;
        dest._pipeCount++;

        source.on('end', onend);
        source.on('close', onclose);
      }

      var didOnEnd = false;
      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;

        dest._pipeCount--;

        // remove the listeners
        cleanup();

        if (dest._pipeCount > 0) {
          // waiting for other incoming streams to end.
          return;
        }

        dest.end();
      }


      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;

        dest._pipeCount--;

        // remove the listeners
        cleanup();

        if (dest._pipeCount > 0) {
          // waiting for other incoming streams to end.
          return;
        }

        dest.destroy();
      }

      // don't leave dangling pipes when there are errors.
      function onerror(er) {
        cleanup();
        if (this.listeners('error').length === 0) {
          throw er; // Unhandled stream error in pipe.
        }
      }

      source.on('error', onerror);
      dest.on('error', onerror);

      // guarantee that source streams can be paused and resumed, even
      // if the only effect is to proxy the event back up the pipe chain.
      if (!source.pause) {
        source.pause = function() {
          source.emit('pause');
        };
      }

      if (!source.resume) {
        source.resume = function() {
          source.emit('resume');
        };
      }

      function onpause() {
        source.pause();
      }

      dest.on('pause', onpause);

      function onresume() {
        if (source.readable) source.resume();
      }

      dest.on('resume', onresume);

      // remove all the event listeners that were added.
      function cleanup() {
        source.removeListener('data', ondata);
        dest.removeListener('drain', ondrain);

        source.removeListener('end', onend);
        source.removeListener('close', onclose);

        dest.removeListener('pause', onpause);
        dest.removeListener('resume', onresume);

        source.removeListener('error', onerror);
        dest.removeListener('error', onerror);

        source.removeListener('end', cleanup);
        source.removeListener('close', cleanup);

        dest.removeListener('end', cleanup);
        dest.removeListener('close', cleanup);
      }

      source.on('end', cleanup);
      source.on('close', cleanup);

      dest.on('end', cleanup);
      dest.on('close', cleanup);

      dest.emit('pipe', source);
    };

    next.push(function() {
      if (encoding) {
        responseBody = responseBody.toString(encoding);
      }
      response.emit('data', responseBody);
    });

    next.push(function() {
      response.emit('end');
    });

    callnext = function() {
      if (paused || next.length === 0 || aborted) { return; }
      process.nextTick(function() {
        next.shift()();
        callnext();
      });
    };
    
    process.nextTick(function() {
      if (typeof callback === 'function') {
        callback(response);
      }
      req.emit('response', response);
      callnext();
    });
  }