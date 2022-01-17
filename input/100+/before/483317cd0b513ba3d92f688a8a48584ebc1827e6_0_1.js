function(buff, index) {
  var parts, len, start, pos;

  start = buff.tell();

  parts = [];
  len = buff.readUInt8();

  while (len !== 0) {
    if (isPointer(len)) {
      len -= LABEL_POINTER;
      len = len << 8;
      pos = len + buff.readUInt8();
      parts.push(index[pos]);
    } else {
      parts.push(buff.toString('ascii', len));
      len = buff.readUInt8();
    }
  }
  parts = parts.join('.');

  index[start] = parts;

  return parts;
}