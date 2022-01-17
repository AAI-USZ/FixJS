function(obj) {
  this.rsa = new libs.RSAKey();
  // this.rsa.readPrivateKeyFromPEMString(obj.value);
  this.rsa.n = new BigInteger(obj.n, 10);
  this.rsa.e = new BigInteger(obj.e, 10);
  this.rsa.d = new BigInteger(obj.d, 10);

  this.keysize = _getKeySizeFromRSAKeySize(this.rsa.n.bitLength());
  return this;
}