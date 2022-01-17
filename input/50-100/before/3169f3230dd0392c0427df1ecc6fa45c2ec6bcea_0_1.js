function(e, xhr, settings, error) {
          switch (xhr.status) {
            case 401:
              return app.vent.trigger('error', 'Authentication error, try logging in again.');
            case 404:
              return app.vent.trigger('error', 'The server didn\'t understand that action.');
            case 500:
              return app.vent.trigger('error', 'There was a server error, try again.');
          }
        }