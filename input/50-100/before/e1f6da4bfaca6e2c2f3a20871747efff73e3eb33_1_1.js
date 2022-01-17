function(opts) {
      if (opts && typeof opts !== 'object') {
        throw new Error('Options passed to ss.client.packAssets() must be an object');
      }
      return options.packedAssets = opts || true;
    }