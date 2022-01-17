function apiTree(name, params, options, callback) {
    var timeout, id = api3.last_msg_id++, data = {id: id};

    // Scenario: rpc(name, callback);
    if (_.isFunction(params)) {
      callback = params;
      params   = options  = {};
    }

    // Scenario: rpc(name, params[, callback]);
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    // fill in defaults
    options   = options || {};
    callback  = callback || $.noop;

    //
    // ERROR HANDLING
    //
    // - when there's no connection (or client is `connecting`), we execute
    //   callback with `ENOCONN` error imediately
    // - when connection lost during waiting for server to send a message into
    //   response channel, we execute calback with `ECONNGONE` error
    // - when server didn't received published request message within 30 seconds
    //   we execute callback with `ETIMEOUT` error
    //

    // check if there an active connection
    if (!is_connected) {
      callback(ioerr(io.ENOCONN, 'No connection to the server (RT).'));
      return;
    }

    // fill in message
    data.msg = {
      version:  nodeca.runtime.version,
      method:   name,
      params:   params
    };

    // stop timer
    function stop_timer() {
      clearTimeout(timeout); // stop timeout counter
      timeout = null; // mark timeout as "removed"
    }

    // simple error handler
    function handle_error(err) {
      stop_timer();
      delete api3.callbacks[id];
      callback(err);
    }

    // handle transport down during request error
    function handle_transport_down() {
      // mimics `once()` event listener
      bayeux.unbind('transport:down', handle_transport_down);
      handle_error(ioerr(io.ECONNGONE, 'Server gone. (RT)'));
    }

    bayeux.bind('transport:down', handle_transport_down);

    // store callback for the response
    api3.callbacks[id] = function (msg) {
      stop_timer();

      nodeca.logger.debug('API3 [' + id + '] Received response', msg);

      bayeux.unbind('transport:down', handle_transport_down);

      if (msg.version !== nodeca.runtime.version) {
        // emit version mismatch error
        emit('api3:version-mismatch', {
          client: nodeca.runtime.version,
          server: msg.version
        });
        callback(ioerr(io.EWRONGVER, 'Client version does not match server.'));
        return;
      }

      if (msg.result) {
        try {
          /*jshint evil:true*/
          eval('msg.result = ' + msg.result);
        } catch (e) {
          callback(ioerr(io.EDECODE, 'Failed unserialize respone: ' + String(e)));
          return;
        }
      }

      nodeca.logger.debug('API3 [' + id + '] Parsed response', msg);

      // run actual callback
      callback(msg.err, msg.result);
    };

    // wait for successfull message delivery 10 seconds
    timeout = setTimeout(function () {
      handle_error(ioerr(io.ETIMEOUT, 'Timeout ' + name + ' execution.'));
    }, 10000);

    nodeca.logger.debug('API3 [' + id + '] Sending request', data.msg);

    // send request
    bayeux_call('publish', [api3.req_channel, data])
      // see bayeux_call info for details on fail/done
      .fail(handle_error)
      .done(stop_timer);
  }