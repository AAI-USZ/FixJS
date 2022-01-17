function(obj) {
  obj.version = '2012.08.15';

  obj.modulus = this.rsa.n.toBase64();
  obj.exponent = new BigInteger(this.rsa.e.toString(), 10).toBase64();
  obj.secretExponent = this.rsa.d.toBase64();
}