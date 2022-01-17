function EofPacket(options) {
  options = options || {};

  this.fieldCount   = undefined;
  this.warningCount = options.warningCount;
  this.statusFlags  = options.statusFlags;
}