function(value) {
        if (value !== 'undefined') {
          debugging = value;
        }
        spaLog('jQuery SPA (Single Page App) v' + SPA_VERSION);
        spaLog('https://github.com/dejanstrbac/spa');
        spaLog('~~~~ ~~~ ~~~ ~~~ ~~~ ~~~~ ~~~~ ~~~');
        spaLog('Debug mode enabled');
      }