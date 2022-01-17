function ReadStream(bin, offset, length) {
  assert(bin instanceof ArrayBuffer);

  this.position = 0;
  this.source = bin;
  this.length = bin.byteLength;
  this.view = offset && length?
    DataView(bin, offset, length) : DataView(bin);
}