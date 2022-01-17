function (err, msg) {
      // TODO: Realtime must send this "HTTP_ONLY" error by itself
      if (err && "HTTP_ONLY" === String(err).replace(/[^a-z]/i, '_').toUpperCase()) {
        window.location = href;
        return;
      }

      // TODO: Properly handle `err` and (?) `msg.error`
      if (err) {
        nodeca.logger.error('Failed apiTree call', err);
        return;
      }

      callback({
        view:   msg.view || match.meta,
        layout: msg.layout,
        locals: msg.data,
        title:  msg.data.head.title,
        route:  msg.data.head.route || match.meta,
        anchor: anchor
      }, null, href);
    }