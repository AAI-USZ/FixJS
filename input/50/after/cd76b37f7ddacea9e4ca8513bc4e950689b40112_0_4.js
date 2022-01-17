function objectFromPackedData(key, buffer) {
    var self = this;
    // ToDo: Fix so that it uses the correct serializer/deserializer
    var data = uchi.getSerializer('json').unpack(buffer);
    return new CacheObject(key, data.value, data.meta);
}