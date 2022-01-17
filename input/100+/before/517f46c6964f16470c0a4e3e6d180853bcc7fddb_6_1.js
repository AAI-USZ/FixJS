function(n, e) {
  var key = {
    n: n,
    e: e
  };

  /**
   * Encrypts the given data with this public key.
   *
   * @param data the byte string to encrypt.
   *
   * @return the encrypted byte string.
   */
  key.encrypt = function(data) {
    return pki.rsa.encrypt(data, key, 0x02);
  };

  /**
   * Verifies the given signature against the given digest.
   *
   * Once RSA-decrypted, the signature is an OCTET STRING that holds
   * a DigestInfo.
   *
   * DigestInfo ::= SEQUENCE {
   *   digestAlgorithm DigestAlgorithmIdentifier,
   *   digest Digest
   * }
   * DigestAlgorithmIdentifier ::= AlgorithmIdentifier
   * Digest ::= OCTET STRING
   *
   * @param digest the message digest hash to compare against the signature.
   * @param signature the signature to verify.
   *
   * @return true if the signature was verified, false if not.
   */
   key.verify = function(digest, signature) {
     // do rsa decryption
     var d = pki.rsa.decrypt(signature, key, true);

     // d is ASN.1 BER-encoded DigestInfo
     var obj = asn1.fromDer(d);

     // compare the given digest to the decrypted one
     return digest === obj.value[1].value;
  };

  return key;
}