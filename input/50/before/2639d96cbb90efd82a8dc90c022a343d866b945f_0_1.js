function objectFromPackedData(key, buffer) {
    // ToDo: use the correct serializer
    var data = JSON.parse(buffer);
    console.log('DATA', data);
    console.log('kjksks', data);
    return new CacheObject(key, data);
}