function(key, value, opts, callback) {
    var self = this;

    if ( typeof opts === 'function' ) {
        callback = opts;
        opts = {};
    }

    // transform the key if necessary
    key = self._transformKey(key);

    // interpret 'opts'
    if ( _.isUndefined(opts) ) {
        opts = self._defaultSetOpts();
    }
    else if ( opts === 'never' ) {
        opts = {};
    }
    else if ( opts === 'now' ) {
        opts = { expiresIn : 0 };
    }
    else if ( _.isArray(opts) ) {
        throw 'Unknown format for opts.';
    }
    else if ( _.isNumber(opts) ) {
        opts = { expiresIn : opts };
    }
    else if ( _.isObject(opts) ) {
        // nothing to do
    }
    else {
        throw 'Unknown format for opts.';
    }

    // if expiresAt or expiresIn are set, then we need to set expiresVariance
    if ( opts.expiresAt || opts.expiresIn ) {
        opts.expiresVariance = self._expiresVariance();
    }
    else {
        // just extent the options passed in
        opts = _.extend({}, self._defaultSetOpts(), opts);
    }

    console.log('1', key);
    console.log('1', value);
    console.log('1', opts);

    // finally, call the setWithOptions
    self._setWithOptions(key, value, opts, callback);
}