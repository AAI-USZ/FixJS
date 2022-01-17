function allocateMemcachedConnection (error, S) {
      if (Client.config.debug) {
        query.command.split(LINEBREAK).forEach(function errors (line) {
          console.log(S.streamID + ' << ' + line);
        });
      }

      // check for issues
      if (error) return query.callback && query.callback(error);

      if (!S) return query.callback && query.callback('Connect did not give a server');

      if (S.readyState !== 'open') {
        return query.callback && query.callback('Connection readyState is set to ' + S.readySate);
      }

      // used for request timing
      query.start = Date.now();
      S.metaData.push(query);
      S.write(query.command + LINEBREAK);
    }