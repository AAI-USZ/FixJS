function parseHeaders(pairs) {
  var count = pairs.readUInt32BE(0, true),
      headers = {};

  pairs = pairs.slice(4);

  function readString() {
    var len = pairs.readUInt32BE(0, true),
        value = pairs.slice(4, 4 + len);

    pairs = pairs.slice(4 + len);

    return value.toString();
  }

  while(count > 0) {
    var k = readString().replace(/^:/, ''),
        v = readString();

    headers[k] = v;

    if (k === 'path') {
      headers['url'] = v;
    }

    count--;
  }

  return headers;
}