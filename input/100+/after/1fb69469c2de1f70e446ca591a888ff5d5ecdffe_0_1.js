function() {
    var self = this;

    // ok, let's firstly serialise the value so we know it's length
    var serializedValue = uchi.getSerializer(self.meta.serializer).pack(self.value());
    var serializerBuffer = new Buffer(serializedValue, 'utf8');

    // create a buffer to hold this AND the metadata at the front
    var output = new Buffer(18 + serializerBuffer.length);
    output.writeUInt8(1, 0);
    output.writeUInt8(self.isTransformed() ? 1 : 0, 1);
    output.writeUInt32LE(1342115784, 2);
    output.writeUInt32LE(1342115785, 6);
    output.writeUInt32LE(1342115786, 10);
    output.write('json', 14, 4, 'ascii');

    // copy the serializedBuffer over to the output one
    serializerBuffer.copy(output, 18);

    // always pack the data
    self.buffer = output;
    return self.buffer;
}