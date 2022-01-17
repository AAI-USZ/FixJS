function(value) {
        if (value !== 'undefined') {
          debugging = value;
        }
        spaLog('jQuery SPA (Single Page App) framework v' + SPA_VERSION);
        spaLog('https://github.com/dejanstrbac/spa\n\n');
        spaLog('Debug mode enabled');
      }