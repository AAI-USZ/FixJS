function uchi(opts) {
    opts = opts || {};

    // check they have supplied a driver
    if ( !opts.driver ) {
        throw 'Supply a driver';
    }

    // check they have supplied a serializer
    if ( !opts.serializer ) {
        throw 'Supply a serializer name';
    }

    // check the serializer is one we know about
    if ( !serializers[opts.serializer] ) {
        throw 'Unknown serializer name';
    }

    // call the constructor on the driver and pass these opts through
    return new driver[opts.driver](opts);
}