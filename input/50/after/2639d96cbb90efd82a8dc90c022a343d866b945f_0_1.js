function objectFromPackedData(key, buffer) {
    // ToDo: use the correct serializer
    var data = JSON.parse(buffer);
    return new CacheObject(key, data);
}