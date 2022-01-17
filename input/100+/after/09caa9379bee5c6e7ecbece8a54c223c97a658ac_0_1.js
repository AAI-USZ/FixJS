function(message) {
      if (message.command === 'loadScript') {
        loader.load(message.url, function() {
          messageChannel.notify({
            command: 'scriptLoaded',
            url: message.url
          })
        });
      } else if (message.command === 'runScript') {
        loader.load('data:text/javascript,' + encodeURIComponent(message.code));
      } else if (message.command === 'exposePluginExports') {
        var exports = iframeWindow.exports;
        for (var i in exports) {
          if (i === 'stage') {
            continue; // don't allow stage to be overwritten
          }
          // Make sure any global assignment errors don't prevent other
          // properties from being exposed. (e.g. trying to expose `NaN`)
          try {
            iframeWindow[i] = exports[i];
            env[i] = exports[i];
          } catch(e) {}
        }
      }
    }