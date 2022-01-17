function(parser) {
  this.fieldCount     = parser.parseUnsignedNumber(1);
  this.errno          = parser.parseUnsignedNumber(2);
  this.sqlStateMarker = parser.parseString(1);
  this.sqlState       = parser.parseString(5);
  this.message        = parser.parsePacketTerminatedString();
}