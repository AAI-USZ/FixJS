function(obj) {
    // obj should be a UchiObject
    // obj = _.extend(obj, { 'serializer' : 'json' });

    obj.setSerializer('json');

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

    console.log('toPack', toPack);

    return JSON.stringify(toPack);
}