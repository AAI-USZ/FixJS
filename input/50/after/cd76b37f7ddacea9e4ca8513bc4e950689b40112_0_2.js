function() {
    var self = this;

    // always pack the data
    var buffer = uchi.getSerializer(self.meta.serializer).pack(self);
    self.buffer = buffer;
    return self.buffer;
}