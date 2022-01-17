function(opts) {
      if (opts && typeof opts !== 'object') {
        throw new Error('Options passed to ss.client.packAssets() must be an object');
      }
      options.packedAssets = opts || true;
      if (options.packedAssets && process.listeners('uncaughtException').length === 0) {
        return process.on('uncaughtException', function(err) {
          console.log('Uncaught Exception!'.red);
          return console.error(err.stack);
        });
      }
    }