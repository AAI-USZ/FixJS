function(key) {
    // TODO: get signature OID from private key
    cert.signatureOid = oids['sha1withRSAEncryption'];
    cert.siginfo.algorithmOid = oids['sha1withRSAEncryption'];
    cert.md = forge.md.sha1.create();

    // get TBSCertificate, convert to DER
    var bytes = asn1.toDer(pki.getTBSCertificate(cert));

    // digest and sign
    cert.md.update(bytes.getBytes());
    cert.signature = key.sign(cert.md);
  }