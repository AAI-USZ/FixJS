function() {
      var storeWithParams = $.stone.create({
        dataScheme: '',
        enableCacheBuffer: false,
        syncBufferLimit: 20,
        saveStrategy: 'all'}),
          defs = storeWithParams._defaults,
          opts = storeWithParams.options,
          dataUrl = storeWithParams.getDataUrl('foo');
      assert.equals(this.DEFS, defs);
      refute.equals(defs, opts);
      refute.equals(defs.dataScheme, opts.dataScheme);
      refute.equals(defs.enableCacheBuffer, opts.enableCacheBuffer);
      refute.equals(defs.syncBufferLimit, opts.syncBufferLimit);
      refute.equals(defs.saveStrategy, opts.saveStrategy);
      assert.equals('foo', dataUrl);
    }