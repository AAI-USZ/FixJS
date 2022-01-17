function() {
  var i8 = this.readByte();
  if (i8 == 0) {
    return false;
  }
  return true;
}