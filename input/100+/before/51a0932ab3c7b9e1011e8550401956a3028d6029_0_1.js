function(fmt, buf, pos) {
  pos = +pos || 0;
  var data = null, // data to push onto return object
      flag,        // flag to denote a variable length type was found
      i,           // counter to step through the fmt string
      length,      // used when a variable length type is found
      ret = [],    // return object
      type;        // the current char in fmt

  for (i = 0; i < fmt.length; i++) {
    // Get the letter from fmt and the size
    type = fmt.charAt(i);

    // Check if dealing with variable length data
    if (flag) {
      if (type == +type) {
        // A length is given
        length = (length) ? length+type : ''+type;
        continue;
      }
      length = +length || 1;

      // Split at the null byte if 'Z'
      data = (flag === 'Z')
             ? buf.toString('ascii', pos, pos + length).split('\u0000')[0]
             : buf.slice(pos, pos + length);
      pos += length;

      // Push the data
      ret.push(data);
      // reset
      flag = null, length = null, data = null;
    }

    // Switch over it
    switch (type) {
      case 's':
        data = buf.readInt16LE(pos);
        break;
      case 'S':
        data = buf.readUInt16LE(pos);
        break;
      case 'i': case 'l':
        data = buf.readInt32LE(pos);
        break;
      case 'I': case 'L':
        data = buf.readUInt32LE(pos);
        break;
      case 'f':
        data = buf.readFloatLE(pos);
        break;
      case 'd':
        data = buf.readDoubleLE(pos);
        break;
      case 'Z': case 'a': case 'A':
        flag = type;
        break;
    }

    // Set the new pos
    pos += +size[type] || 0;

    // Reset data
    length = null;

    // Push the data
    if (data !== null) ret.push(data);
    data = null;
  }
  return ret;
}