function(cert) {
  // Certificate
  return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
    // TBSCertificate
    pki.getTBSCertificate(cert),
    // AlgorithmIdentifier (signature algorithm)
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      // algorithm
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        asn1.oidToDer(cert.signatureOid).getBytes()),
      // parameters (null)
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, '')
    ]),
    // SignatureValue
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.BITSTRING, false,
      String.fromCharCode(0x00) + cert.signature)
  ]);
}