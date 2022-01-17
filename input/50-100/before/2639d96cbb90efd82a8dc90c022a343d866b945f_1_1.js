function(key, buffer) {
    // ToDo: switch this out for other serialisers
    var data = JSON.parse(buffer);
    console.log('data:', data);

    // turn this data structure into a proper object
    console.log('ksjdf', data.value);
    return new CacheObject(key, data.value, data.meta);
}