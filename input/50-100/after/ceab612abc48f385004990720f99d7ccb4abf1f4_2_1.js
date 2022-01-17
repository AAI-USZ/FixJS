function(obj) {
  this.rsa.n = new libs.BigInteger(obj.n, 10);
  this.rsa.e = new libs.BigInteger(obj.e, 10);
}