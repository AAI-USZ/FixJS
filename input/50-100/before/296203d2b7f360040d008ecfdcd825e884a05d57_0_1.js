function (err, msg) {
        // TODO: Properly handle `err` and (?) `msg.error`
        if (err) {
          nodeca.logger.error('Failed apiTree call', err);
          return;
        }

        History.pushState(null, msg.data.head.title, href);

        // FIXME: use view from msg
        nodeca.render(match.meta, msg.data);
      }