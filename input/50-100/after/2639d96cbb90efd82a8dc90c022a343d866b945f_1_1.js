function(key, buffer) {
    // ToDo: switch this out for other serialisers
    var data = JSON.parse(buffer);

    // turn this data structure into a proper object
    return new CacheObject(key, data.value, data.meta);
}