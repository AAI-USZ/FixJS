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
   * PKCS#1 supports multiple (currently two) signature schemes:
   * RSASSA-PKCS1-v1_5 and RSASSA-PSS.
   *
   * By default this implementation uses the "old scheme", i.e.
   * RSASSA-PKCS1-v1_5, in which case once RSA-decrypted, the
   * signature is an OCTET STRING that holds a DigestInfo.
   *
   * DigestInfo ::= SEQUENCE {
   *   digestAlgorithm DigestAlgorithmIdentifier,
   *   digest Digest
   * }
   * DigestAlgorithmIdentifier ::= AlgorithmIdentifier
   * Digest ::= OCTET STRING
   *
   * To perform PSS signature verification, provide an instance
   * of Forge PSS object as scheme parameter.
   *
   * @param digest the message digest hash to compare against the signature.
   * @param signature the signature to verify.
   * @param scheme signature scheme to use, undefined for PKCS#1 v1.5
   *   padding style.
   * @return true if the signature was verified, false if not.
   */
   key.verify = function(digest, signature, scheme) {
     // do rsa decryption
     var ml = scheme === undefined ? undefined : false;
     var d = pki.rsa.decrypt(signature, key, true, ml);

     if(scheme === undefined) {
       // d is ASN.1 BER-encoded DigestInfo
       var obj = asn1.fromDer(d);

       // compare the given digest to the decrypted one
       return digest === obj.value[1].value;
     } else {
       return scheme.verify(digest, d, key.n.bitLength());
     }
  };

  return key;
}