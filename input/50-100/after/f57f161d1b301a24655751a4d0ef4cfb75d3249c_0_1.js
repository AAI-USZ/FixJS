function(parser) {
  this.fieldCount = parser.parseUnsignedNumber(1);
  this.errno      = parser.parseUnsignedNumber(2);

  // sqlStateMarker ('#' = 0x23) indicates error packet format
  if (parser.peak() === 0x23) {
    this.sqlStateMarker = parser.parseString(1);
    this.sqlState       = parser.parseString(5);
  }

  this.message = parser.parsePacketTerminatedString();
}