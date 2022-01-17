function(obj) {
    // obj should be a UchiObject
    // obj = _.extend(obj, { 'serializer' : 'json' });

    // value is always a Buffer object
    var toPack = {
        'key'   : obj.key(),
        'value' : obj.value(),
        'meta'  : {
            'createdAt'      : obj.createdAt(),
            'expiresAt'      : obj.expiresAt(),
            'earlyExpiresAt' : obj.earlyExpiresAt(),
            'serializer'     : 'json',
            // 'isCompressed'   : false,
            // 'size'           : value.length, // the size of the value Buffer or the packed data
        },
    };

    // ToDo: Fix so that it packs the cache object version and the serializer _before_ the data
    return JSON.stringify(toPack);
}