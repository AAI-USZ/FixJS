function parseSynHead(type, flags, data) {
  var stream = type === 0x01;

  return {
    type: stream ? 'SYN_STREAM' : 'SYN_REPLY',
    id: data.readUInt32BE(0, true) & 0x7fffffff,
    associated: stream ? data.readUInt32BE(4, true) & 0x7fffffff : 0,
    priority: stream ? data[8] >> 6 : 0,
    fin: (flags & 0x01) === 0x01,
    unidir: (flags & 0x02) === 0x02,
    _offset: stream ? 10 : 6
  };
}