function objectFromPackedData(key, buffer) {
    var self = this;

    console.log('buffer is ' + buffer.length + ' bytes long');
    console.log('buffer=', buffer);

    // the format of a binary CacheObject is:
    //
    // * 1 byte for an 8 bit unsigned CacheVersion (version 1 is documented here)
    // * 1 byte for an 8 bit unsigned isTransformed (referring to the key)
    // * 4 bytes for a 32 bit unsigned CreatedAt
    // * 4 bytes for a 32 bit unsigned EarlyExpiresAt
    // * 4 bytes for a 32 bit unsigned ExpiresAt
    // * 4 bytes as a string for the serialiser used
    // * the rest as a raw buffer

    // make sure this buffer is at least 18 bytes long
    if ( buffer.length < 18 ) {
        throw "Can't decode a Cache Object buffer which is less than 14 bytes long";
    }

    // so, let's find the index of the 2nd \n
    var meta = {};
    meta.format         = buffer.readUInt8(0);
    meta.isTransformed  = buffer.readUInt8(1);
    meta.createdAt      = buffer.readUInt32LE(2);
    meta.earlyExpiresAt = buffer.readUInt32LE(6);
    meta.expiresAt      = buffer.readUInt32LE(10);
    meta.serializer     = buffer.toString('ascii', 14, 18);

    console.log('meta=', meta);

    // now get the value back
    var rawValue = buffer.slice(18);
    console.log('raw=' + rawValue.toString('utf8'));
    var value = uchi.getSerializer(meta.serializer).unpack(rawValue);
    console.log('value=', value);
    return new CacheObject(key, value, meta);
}