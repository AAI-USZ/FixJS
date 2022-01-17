function() {
  var byte = this.readByte();
  if (byte == 0) {
    return false;
  }
  return true;
}