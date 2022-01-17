function() {
    var self = this;

    // always pack the data
    var buffer = self.serializer().pack(self);
    self.buffer = buffer;
    return buffer;
}