function(buff, index) {
  var parts, len, start, pos, i, part, combine = [];

  start = buff.tell();

  parts = [];
  len = buff.readUInt8();

  while (len !== 0) {
    if (isPointer(len)) {
      len -= LABEL_POINTER;
      len = len << 8;
      pos = len + buff.readUInt8();
      parts.push({
        pos: pos,
        value: index[pos],
      });
    } else {
      parts.push({
        pos: buff.tell() - 1,
        value: buff.toString('ascii', len),
      });
      len = buff.readUInt8();
    }
  }

  for (i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    combine.splice(0, 0, part.value);
    index[part.pos] = combine.join('.');
  }

  return combine.join('.');
}