function( ) {

    var result = _.noConflict();
    var slice = Array.prototype.slice;

    // This addresses a phantomjs issue. Somehow objects
    // get read only properties with indexes -1, -3, -6,
    // and undefined or null values. So we don't copy them.

    result.extend = function( obj ) {
        result.each(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                try {
                    obj[prop] = source[prop];
                }
                catch( x ) { 
                    if ( prop.indexOf( "-" ) !== 0 
                         || (source[prop]) ) {
                             console.log( "That error, but " + prop + " and " + obj[prop] + " " + typeof(obj[prop]));
                             throw x;
                         }
                    // else no problem
                }
            }
        } );
        return obj;
    };

    return result;

}