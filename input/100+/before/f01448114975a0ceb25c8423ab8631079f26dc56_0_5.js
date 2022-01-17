function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = readUint32(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3F;
    if (!SegmentTypes[segmentType])
      throw 'Invalid segment type: ' + segmentType;
    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);
    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = (referredFlags >> 5) & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;
    if (referredFlags == 7) {
      referredToCount = readInt32(data, position - 1) & 0x1FFFFFFF;
      position += 3;
      var bytes = (referredToCount + 7) >> 3;
      retainBits[0] = data[position++];
      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags == 5 || referredFlags == 6)
      throw 'Invalid referred-to flags';
    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 :
      segmentHeader.number <= 65536 ? 2 : 4;
    var referredTo = [];
    for (var i = 0; i < referredToCount; i++) {
      var number = referredToSegmentNumberSize == 1 ? data[position] :
        referredToSegmentNumberSize == 2 ? readUint16(data, position) :
        readUint32(data, position);
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }
    segmentHeader.referredTo = referredTo;
    if (!pageAssociationFieldSize)
      segmentHeader.pageAssociation = data[position++];
    else {
      segmentHeader.pageAssociation = readUint32(data, position);
      position += 4;
    }
    segmentHeader.length = readUint32(data, position);
    if (segmentHeader.length == 0xFFFFFFFF)
      throw 'Unsupported unknown segment length';
    position += 4;
    segmentHeader.headerEnd = position;
    return segmentHeader;
  }