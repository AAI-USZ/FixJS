function ResultSetHeaderPacket(options) {
  options = options || {};

  this.fieldCount = options.fieldCount;
  this.extra      = options.extra;
}