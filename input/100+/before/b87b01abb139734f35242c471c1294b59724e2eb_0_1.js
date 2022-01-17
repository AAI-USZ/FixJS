function edit () {
    var i, l, t, flags, flagsString, subject, subjectIsArray, deltas, delta,
        key, value, valueIsArray, source, target, clone, result;

    i = 0; l = arguments.length;
    t = type( arguments[0] );

    if ( t === 'boolean' ) {
        flagsString = 'deep';
        flags = { deep: flagsString };
        i += 1;
    } else if ( t === 'string' ) {
        flagsString = arguments[i];
        flags = assign( flagsString );
        i += 1;
    } else {
        flags = NIL;
    }

    subject = arguments[i] || {};
    i += 1;
    typeof subject === 'object' || isFunction( subject ) || ( subject = {} );
    subjectIsArray = isArray( subject );

    flags.delta && l - 1 > i && ( deltas = [] );

    for ( ; i < l; i++ ) {
        flags.delta && ( delta = subjectIsArray ? [] : {} );
        deltas && deltas.push( delta );
        source = arguments[i];

        if ( source == null ) continue;

        for ( key in source ) if ( !flags.own || hasOwn.call( source, key ) ) {
            value = source[ key ];
            if ( value === subject ) continue;
            if ( value === NIL && !flags.all ) {
                delta && ( delta[ key ] = subject[ key ] );
                flags.immutable || delete subject[ key ];
            }
            else if ( flags.deep && value && ( isPlainObject( value ) ||
                ( valueIsArray = isArray( value ) ) )
            ) {
                target = subject[ key ];
                if ( valueIsArray ) {
                    valueIsArray = false;
                    clone = target && isArray( target ) ?
                        target :
                        [];
                } else {
                    clone = target && ( isFunction( target ) ||
                            typeof target === 'object' ) ?
                        target :
                        {};
                }
                result = edit( flagsString, clone, value );
                if ( delta ) {
                    if ( hasOwn.call( subject, key ) ) {
                        if ( result && !isEmpty( result ) ) {
                            delta[ key ] = result;
                        }
                    } else {
                        delta[ key ] = NIL;
                    }
                }
                flags.immutable || ( subject[ key ] = clone );
            }
            else if (
                subject[ key ] !== value &&
                ( value !== undefined || flags.all )
            ) {
                if ( delta ) {
                    delta[ key ] = hasOwn.call( subject, key ) ?
                        subject[ key ] :
                        NIL;
                }
                flags.immutable || ( subject[ key ] = value );
            }
        }
        if ( flags.absolute && ( flags.delta || !flags.immutable ) ) {
            for ( key in subject ) if ( hasOwn.call( subject, key ) ) {
                if ( !( flags.own ?
                            hasOwn.call( source, key ) :
                            key in source )
                ) {
                    delta && ( delta[ key ] = subject[ key ] );
                    flags.immutable || delete subject[ key ];
                }
            }
        }
    }
    return deltas || delta || subject;
}