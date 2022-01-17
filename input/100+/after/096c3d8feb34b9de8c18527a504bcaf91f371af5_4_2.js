function(parser) {
  this.catalog     = parser.parseLengthCodedString();
  this.db          = parser.parseLengthCodedString();
  this.table       = parser.parseLengthCodedString();
  this.orgTable    = parser.parseLengthCodedString();
  this.name        = parser.parseLengthCodedString();
  this.orgName     = parser.parseLengthCodedString();
  this.filler1     = parser.parseFiller(1);
  this.charsetNr   = parser.parseUnsignedNumber(2);
  this.fieldLength = parser.parseUnsignedNumber(4);
  this.type        = parser.parseUnsignedNumber(1);
  this.flags       = parser.parseUnsignedNumber(2);
  this.decimals    = parser.parseUnsignedNumber(1);
  this.filler2     = parser.parseFiller(2);

  if (parser.reachedPacketEnd()) {
    return;
  }

  this.default = parser.parseLengthCodedNumber();
}