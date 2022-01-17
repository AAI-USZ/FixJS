function(key, value, opts, callback) {
    var self = this;

    console.log('2', key);
    console.log('2', value);
    console.log('2', opts);

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

    console.log('3', key);
    console.log('3', value);
    console.log('3', opts);

    // now we can make the object
    console.log('uuduudu', value);
    var obj = new CacheObject(key, value, {
        'createdAt'      : createdAt,
        'earlyExpiresAt' : earlyExpiresAt,
        'expiresAt'      : expiresAt,
        'compression'    : false, // ToDo: self.compressThreshold(),
        'serializer'     : opts.serializer || self.serializer(),
    });

    console.log('_setWithOptions():obj:', obj);

    var buffer = obj.pack();

    // call the actual driver to do this :)
    self._store(key, buffer, callback);
}