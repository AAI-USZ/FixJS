function(resource, statement, context, source) {
    if(!_.isArray(resource) && statement.columns.name === '*') {
        // Don't filter
        return resource;
    }
    else {
        return _iterate(resource, statement, context, source, true);
    }
}