function onerror(error) {
      if (opts.continuous) {
        IdbPouch.Changes.addListener(name, id, opts);
      }
      call(opts.complete);
    }