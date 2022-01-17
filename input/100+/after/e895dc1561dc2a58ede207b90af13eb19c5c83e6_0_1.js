function moduleError (msg) {
        return new Error(msg + ': ' + JSON.stringify(mfile)
            + ' from directory ' + JSON.stringify(opts.dirname)
            + (opts.fromFile ? ' while processing file ' + opts.fromFile : '')
        );
    }