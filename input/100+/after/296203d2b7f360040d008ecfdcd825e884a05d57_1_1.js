function (msg) {
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
    }