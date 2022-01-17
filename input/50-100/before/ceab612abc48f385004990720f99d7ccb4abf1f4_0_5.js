function(obj) {
  this.y = new BigInteger(obj.y, 16);

  //this.keysize = _getKeySizeFromYBitlength(this.y.bitLength());
  this.keysize = keysizeFromObject(obj);
  return this;
}