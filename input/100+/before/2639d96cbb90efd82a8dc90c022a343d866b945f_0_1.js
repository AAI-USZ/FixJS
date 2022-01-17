function(key, value, opts) {
    var self = this;

    // default to no options
    opts = opts || {};

    console.log('CacheObject(): new()');
    console.log('* key', key);
    console.log('* value', value);
    console.log('* opts', opts);

    if ( !key ) {
        throw 'CacheObject: new() requires a key for construction.';
    }

    if ( !value ) {
        throw 'CacheObject: new() requires a value for construction.';
    }

    // go through the things that we require first and save them
    self._key   = key;
    self._value = value;

    // now go through the optional attrs and store them if they are defined
    optionalAttrs.forEach(function(name, i) {
        if ( !_.isUndefined(opts[name]) ) {
            self[name] = opts[name];
        }
    });

    console.log('self1', self);

    // if some of the optional attrs aren't passed, make them ourselves
    self.createdAt  = self.createdAt  || new Date();
    self.serializer = opts.serializer || 'json';

    console.log('self2', self);

    // store the incoming value into a Buffer depending on what kind of value it is
    if ( typeof value === 'string' ) {
        // convert the string to a buffer
        self.buffer = new Buffer(value);
    }
    else if ( typeof value === 'number' ) {
        // convert the number to a buffer
        self.buffer = new Buffer(value);
    }
    else if ( typeof value === 'boolean' ) {
        // convert the boolean to a buffer
        self.buffer = new Buffer(value);
    }
    else if ( _.isDate(value) ) {
        // convert the date to a string, then a buffer
        self.buffer = new Buffer(value.toISOString());
    }
    else if ( Buffer.isBuffer(value) ) {
        // copy the buffer
        self.buffer = new Buffer(value);
    }
    else if ( _.isObject(value) ) {
        // serialize the value first
        self.buffer = new Buffer(JSON.stringify(value));
    }
    else {
        // we don't know what the incoming type is
        throw 'Unknown type for value.';
    }

    // do the actual packing here (pack() saves it onto this object)
    console.log('self3', self);
    self.pack();

    console.log('self4', self);

    return self;
}