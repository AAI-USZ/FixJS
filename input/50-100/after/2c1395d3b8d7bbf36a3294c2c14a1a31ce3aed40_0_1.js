function ReadStream(bin, offset, length) {
  console.assert(bin instanceof ArrayBuffer);

  this.position = 0;
  this.source = bin;
  this.length = bin.byteLength;
  this.view = offset && length?
    new DataView(bin, offset, length) : new DataView(bin);
}