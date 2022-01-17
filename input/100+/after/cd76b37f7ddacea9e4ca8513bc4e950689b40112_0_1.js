function(key, value, opts) {
    var self = this;

    // default to no options
    opts = opts || {};

    if ( !key ) {
        throw 'CacheObject: new() requires a key for construction.';
    }

    if ( !value ) {
        throw 'CacheObject: new() requires a value for construction.';
    }

    // go through the things that we require first and save them
    self._key   = key;
    self._value = value;

    // go through the optional meta attrs and store them if they are defined
    self.meta = {};
    optMetaAttrs.forEach(function(name, i) {
        if ( !_.isUndefined(opts[name]) ) {
            self.meta[name] = opts[name];
        }
    });

    // if some of the optional attrs aren't passed, make them ourselves
    self.meta.createdAt  = self.meta.createdAt  || new Date();
    self.meta.serializer = self.meta.serializer || 'json';

    // store the incoming value into a Buffer depending on what kind of value it is
    if ( typeof value === 'string' ) {
        // convert the string to a buffer
        // self.buffer = new Buffer(value);
    }
    else if ( typeof value === 'number' ) {
        // convert the number to a buffer
        // self.buffer = new Buffer(value);
    }
    else if ( typeof value === 'boolean' ) {
        // convert the boolean to a buffer
        // self.buffer = new Buffer(value);
    }
    else if ( _.isDate(value) ) {
        // convert the date to a string, then a buffer
        // self.buffer = new Buffer(value.toISOString());
    }
    else if ( Buffer.isBuffer(value) ) {
        // copy the buffer
        // self.buffer = new Buffer(value);
    }
    else if ( _.isObject(value) ) {
        // serialize the value first
        // self.buffer = uchi.getSerializer(self.meta.serializer).pack(self);
        // nothing to do
    }
    else {
        // we don't know what the incoming type is
        throw 'Unknown type for value.';
    }

    // do the actual packing here (pack() saves it onto this object)
    self.pack();
    return self;
}