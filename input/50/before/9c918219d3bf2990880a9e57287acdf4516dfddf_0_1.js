function isEqual ( subject, object ) {
    return subject === object || isEmpty( diff( subject, object || {} ) );
}