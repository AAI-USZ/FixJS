function onTxnComplete() {
      call(opts.complete, null, {results: results});
    }