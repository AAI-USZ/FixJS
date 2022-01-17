function() {
    var self = this;

    // ok, let's firstly serialise the value so we know it's length
    var serializedValue = uchi.getSerializer(self.meta.serializer).pack(self.value());
    console.log('serializedValue=' + serializedValue);
    var serializerBuffer = new Buffer(serializedValue, 'utf8');
    console.log('serializedBuffer is ' + serializerBuffer.length + ' bytes long');

    // create a buffer to hold this AND the metadata at the front
    var output = new Buffer(18 + serializerBuffer.length);

    console.log('output buffer is ' + output.length + ' bytes long');

    output.writeUInt8(1, 0);
    output.writeUInt8(self.isTransformed() ? 1 : 0, 1);
    output.writeUInt32LE(1342115784, 2);
    output.writeUInt32LE(1342115785, 6);
    output.writeUInt32LE(1342115786, 10);
    output.write('json', 14, 4, 'ascii');

    // copy the serializedBuffer over to the output one
    serializerBuffer.copy(output, 18);
    // console.log('output=', output);

    // always pack the data
    self.buffer = output;
    return self.buffer;
}