function() {
    var self = this;
    var data = self.serializer().unpack(self.buffer);
    return data;
}