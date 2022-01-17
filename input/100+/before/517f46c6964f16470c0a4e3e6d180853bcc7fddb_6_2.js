function(n, e, d, p, q, dP, dQ, qInv) {
  var key = {
    n: n,
    e: e,
    d: d,
    p: p,
    q: q,
    dP: dP,
    dQ: dQ,
    qInv: qInv
  };

  /**
   * Decrypts the given data with this private key.
   *
   * @param data the byte string to decrypt.
   *
   * @return the decrypted byte string.
   */
  key.decrypt = function(data) {
    return pki.rsa.decrypt(data, key, false);
  };

  /**
   * Signs the given digest, producing a signature.
   *
   * First the digest is stored in a DigestInfo object. Then that object
   * is RSA-encrypted to produce the signature.
   *
   * DigestInfo ::= SEQUENCE {
   *   digestAlgorithm DigestAlgorithmIdentifier,
   *   digest Digest
   * }
   * DigestAlgorithmIdentifier ::= AlgorithmIdentifier
   * Digest ::= OCTET STRING
   *
   * @param md the message digest object with the hash to sign.
   *
   * @return the signature as a byte string.
   */
  key.sign = function(md) {
    // get the oid for the algorithm
    var oid;
    if(md.algorithm in forge.pki.oids) {
      oid = forge.pki.oids[md.algorithm];
    }
    else {
      throw {
        message: 'Unknown message digest algorithm.',
        algorithm: md.algorithm
      };
    }
    var oidBytes = asn1.oidToDer(oid).getBytes();

    // create the digest info
    var digestInfo = asn1.create(
      asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, []);
    var digestAlgorithm = asn1.create(
      asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, []);
    digestAlgorithm.value.push(asn1.create(
      asn1.Class.UNIVERSAL, asn1.Type.OID, false, oidBytes));
    digestAlgorithm.value.push(asn1.create(
      asn1.Class.UNIVERSAL, asn1.Type.NULL, false, ''));
    var digest = asn1.create(
      asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING,
      false, md.digest().getBytes());
    digestInfo.value.push(digestAlgorithm);
    digestInfo.value.push(digest);

    // encode digest info
    var d = asn1.toDer(digestInfo).getBytes();

    // do rsa encryption
    return pki.rsa.encrypt(d, key, 0x01);
  };

  return key;
}