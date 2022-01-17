function isEqual ( subject, object ) {
    return subject === object ||
        isEmpty( edit(
            'deep all absolute immutable delta', subject, object || {}
        ));
}