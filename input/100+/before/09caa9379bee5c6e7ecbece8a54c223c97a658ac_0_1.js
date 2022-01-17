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
        // Don't allow anything to overwrite the bonsai stage:
        if ('stage' in iframeWindow.exports) {
          delete iframeWindow.exports.stage;
        }
        tools.mixin(env, iframeWindow.exports);
        tools.mixin(iframeWindow, iframeWindow.exports);
      }
    }