function(str, buff, buf_pos, index) {
  var written = 0,
      found_ptr = false,
      written_parts = [],
      parts, name, left;

  var compress = function(s) {
    if (!s) { return false; }

    var offset = index[s];
    if (offset) {
      offset = (LABEL_POINTER << 8) + offset;
      buff.writeUInt16BE(offset, buf_pos + written);
      written += 2;
      return true;
    }
    return false;
  };

  var splitStr = function(s) {
    if (s && s.length) {
      parts = splitMax(s, '.', 1);
      name = parts[0];
      if (parts.length > 1) {
        left = parts[1];
      } else {
        left = undefined;
      }
    } else {
      parts = [];
      name = undefined;
      left = undefined;
    }
  };

  found_ptr = compress(str);
  splitStr(str);

  while (!found_ptr && parts.length > 0) {
    written_parts.push({
      value: name,
      offset: written + buf_pos,
    });

    buff.writeUInt8(name.length, written + buf_pos);
    written += 1;
    buff.write(name, written + buf_pos, name.length);
    written += name.length;

    found_ptr = compress(left);
    splitStr(left);
  }

  if (!found_ptr) {
    buff.writeUInt8(0, written + buf_pos);
    written += 1;
  }

  if (written_parts.length) {
    var i = written_parts.length;
    while (i > 0) {
      var key = written_parts.slice(i-1);
      var names = [];
      key.forEach(function(k) { names.push(k.value); });
      index[names.join('.')] = key[0].offset;
      i -= 1;
    }
  }

  return written;
}