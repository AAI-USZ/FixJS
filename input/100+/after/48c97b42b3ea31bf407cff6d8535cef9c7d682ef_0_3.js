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
        // don't allow anything to overwrite the bonsai stage
        delete globalExports.stage;
        tools.mixin(env, globalExports);
        tools.mixin(iframeWindow, globalExports);
      }
    }