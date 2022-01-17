function(obj) {
  this.p = BigInteger.fromBase64(obj.p);
  this.q = BigInteger.fromBase64(obj.q);
  this.g = BigInteger.fromBase64(obj.g);
  this.y = BigInteger.fromBase64(obj.y);
}