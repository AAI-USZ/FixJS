function (err, msg) {
        // TODO: Properly handle `err` and (?) `msg.error`
        if (err) {
          nodeca.logger.error('Failed apiTree call', err);
          return;
        }

        try {
          nodeca.render(msg.view || match.meta, msg.layout, msg.data);
        } catch (err) {
          if ('NODECA_PLACEHOLDER_NOT_FOUND' === err) {
            window.location = href;
            return;
          }

          // FIXME: redirect on error? or at least propose user to click
          //        a link to reload to the requested page
          nodeca.logger.error('Failed render view <' + (msg.view || match.meta) +
                              '> with layout <' + msg.layout + '>', err);
          return;
        }

        History.pushState(null, msg.data.head.title, href);

        // set active menu
        $('[data-api3-route]').removeClass('active');

        var route = msg.data.head.route || match.meta;
        $('[data-api3-route="' + route + '"]').addClass('active');
      }