function(obj) {
  this.rsa = new libs.RSAKey();
  this.rsa.n = new libs.BigInteger(obj.n, 10);
  this.rsa.e = new libs.BigInteger(obj.e, 10);
  // this.rsa.readPublicKeyFromPEMString(obj.value);

  this.keysize = _getKeySizeFromRSAKeySize(this.rsa.n.bitLength());
  return this;
}