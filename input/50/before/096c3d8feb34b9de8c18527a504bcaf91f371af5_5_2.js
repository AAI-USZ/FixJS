function(parser) {
  this.fieldCount = parser.parseLengthCodedNumber();

  if (parser.reachedPacketEnd) {
    return;
  }

  this.extra = parser.parseLengthCodedNumber();
}