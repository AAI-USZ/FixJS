function() {
    var self = this;
    var data = uchi.getSerializer(self.meta.serializer).unpack(self.buffer);
    return data;
}