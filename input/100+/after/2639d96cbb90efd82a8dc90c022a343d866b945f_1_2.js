function(key, value, opts, callback) {
    var self = this;

    // Determine the early and final expiration times
    var nowFromEpoch = dateAsEpoch(new Date());
    var createdAt = nowFromEpoch;
    var expiresAt = opts.expiresIn ? nowFromEpoch + opts.expiresIn : opts.expiresAt;

    // earlyExpiresAt - may allow this as an option, but for now, we'll calculate it
    var earlyExpiresAt;
    if ( opts.earlyExpiresAt ) {
        earlyExpiresAt = opts.earlyExpiresAt;
    }
    else if ( expiresAt ) {
        earlyExpiresAt = expiresAt - ( expiresAt - nowFromEpoch ) * opts.expiresVariance;
    }
    else {
        // no expiresAt, therefore no earlyExpiresAt
    }

    // now we can make the object
    var obj = new CacheObject(key, value, {
        'createdAt'      : createdAt,
        'earlyExpiresAt' : earlyExpiresAt,
        'expiresAt'      : expiresAt,
        'compression'    : false, // ToDo: self.compressThreshold(),
        'serializer'     : opts.serializer || self.serializer(),
    });

    var buffer = obj.pack();

    // call the actual driver to do this :)
    self._store(key, buffer, callback);
}