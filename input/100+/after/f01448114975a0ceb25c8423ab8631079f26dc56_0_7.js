function parseJbig2(data, start, end) {
    var position = start;
    if (data[position] != 0x97 || data[position + 1] != 0x4A ||
        data[position + 2] != 0x42 || data[position + 3] != 0x32 ||
        data[position + 4] != 0x0D || data[position + 5] != 0x0A ||
        data[position + 6] != 0x1A || data[position + 7] != 0x0A)
      error('JBIG2 error: invalid header');
    var header = {};
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);
    if (!(flags & 2)) {
      header.numberOfPages = readUint32(data, position);
      position += 4;
    }
    var segments = readSegments(header, data, position, end);
    error('Not implemented');
    // processSegments(segments, new SimpleSegmentVisitor());
  }