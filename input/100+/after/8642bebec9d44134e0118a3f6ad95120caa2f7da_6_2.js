function createMessage(event, data) {
  var header = new Buffer(9);

  if (typeof event === 'string') {
    event = event.split(this.delimiter);
  }

  event = Buffer(JSON.stringify(event));

  if (Buffer.isBuffer(data)) {
    header.writeInt8(1, 8);
  } else {
    data = Buffer(JSON.stringify(data));
    header.writeInt8(0, 8);
  }

  header.writeUInt32BE(event.length, 0);
  header.writeUInt32BE(data.length, 4);

  return Buffer.concat([header, event, data], 9 + event.length + data.length);
}