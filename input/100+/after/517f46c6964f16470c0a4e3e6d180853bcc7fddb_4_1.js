function(child) {
    var rval = false;

    if(child.md !== null) {
      var scheme;

      switch(child.signatureOid) {
        case oids['sha1withRSAEncryption']:
          scheme = undefined;  /* use PKCS#1 v1.5 padding scheme */
          break;

        case oids['RSASSA-PSS']:
          var hash, mgf;

          /* initialize mgf */
          hash = oids[child.signatureParameters.mgf.hash.algorithmOid];
          if(hash === undefined || forge.md[hash] === undefined) {
            throw {
              message: 'Unsupported MGF hash function',
              oid: child.signatureParameters.mgf.hash.algorithmOid,
              name: hash
            };
          }

          mgf = oids[child.signatureParameters.mgf.algorithmOid];
          if(mgf === undefined || forge.mgf[mgf] === undefined) {
            throw {
              message: 'Unsupported MGF function',
              oid: child.signatureParameters.mgf.algorithmOid,
              name: mgf
            };
          }

          mgf = forge.mgf[mgf].create(forge.md[hash].create());

          /* initialize hash function */
          hash = oids[child.signatureParameters.hash.algorithmOid];
          if(hash === undefined || forge.md[hash] === undefined) {
            throw {
              message: 'Unsupported RSASSA-PSS hash function',
              oid: child.signatureParameters.hash.algorithmOid,
              name: hash
            };
          }

          scheme = forge.pss.create(forge.md[hash].create(), mgf,
            child.signatureParameters.saltLength);
          break;
      }

      // verify signature on cert using public key
      rval = cert.publicKey.verify(
        child.md.digest().getBytes(), child.signature, scheme);
    }

    return rval;
  }