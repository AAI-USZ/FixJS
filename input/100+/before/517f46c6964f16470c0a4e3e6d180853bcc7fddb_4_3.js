function(obj, computeHash) {
  // validate certificate and capture data
  var capture = {};
  var errors = [];
  if(!asn1.validate(obj, x509CertificateValidator, capture, errors)) {
    throw {
      message: 'Cannot read X.509 certificate. ' +
        'ASN.1 object is not an X509v3 Certificate.',
      errors: errors
    };
  }

  // get oid
  var oid = asn1.derToOid(capture.publicKeyOid);
  if(oid !== pki.oids['rsaEncryption']) {
    throw {
      message: 'Cannot read public key. OID is not RSA.'
    };
  }

  // create certificate
  var cert = pki.createCertificate();
  cert.version = capture.certVersion ?
    capture.certVersion.charCodeAt(0) : 0;
  var serial = forge.util.createBuffer(capture.certSerialNumber);
  cert.serialNumber = serial.toHex();
  cert.signatureOid = forge.asn1.derToOid(capture.certSignatureOid);
  // skip "unused bits" in signature value BITSTRING
  var signature = forge.util.createBuffer(capture.certSignature);
  ++signature.read;
  cert.signature = signature.getBytes();

  if(capture.certNotBefore !== undefined) {
    cert.validity.notBefore = asn1.utcTimeToDate(capture.certNotBefore);
  }
  else if(capture.certNotBeforeGeneralized !== undefined) {
    cert.validity.notBefore = asn1.generalizedTimeToDate
      (capture.certNotBeforeGeneralized);
  }
  else {
    throw {
      message: 'Cannot read notBefore time, neither provided as UTCTime ' +
        'nor as GeneralizedTime.'
    };
  }

  if(capture.certNotAfter !== undefined) {
    cert.validity.notAfter = asn1.utcTimeToDate(capture.certNotAfter);
  }
  else if(capture.certNotAfterGeneralized !== undefined) {
    cert.validity.notAfter = asn1.generalizedTimeToDate
      (capture.certNotAfterGeneralized);
  }
  else {
    throw {
      message: 'Cannot read notAfter time, neither provided as UTCTime ' +
        'nor as GeneralizedTime.'
    };
  }

  if(computeHash) {
    // check signature OID for supported signature types
    cert.md = null;
    if(cert.signatureOid in oids) {
      var oid = oids[cert.signatureOid];
      if(oid === 'sha1withRSAEncryption') {
        cert.md = forge.md.sha1.create();
      }
      else if(oid === 'md5withRSAEncryption') {
        cert.md = forge.md.md5.create();
      }
    }
    if(cert.md === null) {
      throw {
        message: 'Could not compute certificate digest. ' +
          'Unknown signature OID.',
        signatureOid: cert.signatureOid
      };
    }

    // produce DER formatted TBSCertificate and digest it
    var bytes = asn1.toDer(capture.certTbs);
    cert.md.update(bytes.getBytes());
  }

  // handle issuer, build issuer message digest
  var imd = forge.md.sha1.create();
  cert.issuer.attributes = pki.RDNAttributesAsArray(capture.certIssuer, imd);
  if(capture.certIssuerUniqueId) {
    cert.issuer.uniqueId = capture.certIssuerUniqueId;
  }
  cert.issuer.hash = imd.digest().toHex();

  // handle subject, build subject message digest
  var smd = forge.md.sha1.create();
  cert.subject.attributes = pki.RDNAttributesAsArray(capture.certSubject, smd);
  if(capture.certSubjectUniqueId) {
    cert.subject.uniqueId = capture.certSubjectUniqueId;
  }
  cert.subject.hash = smd.digest().toHex();

  // handle extensions
  if(capture.certExtensions) {
    cert.extensions = _parseExtensions(capture.certExtensions);
  }
  else {
    cert.extensions = [];
  }

  // convert RSA public key from ASN.1
  cert.publicKey = pki.publicKeyFromAsn1(capture.subjectPublicKeyInfo);

  return cert;
}