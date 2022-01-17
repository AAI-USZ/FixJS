function _decodeSafeContents(safeContents, password) {
  safeContents = asn1.fromDer(safeContents);  /* actually it's BER-encoded. */

  if(safeContents.tagClass !== asn1.Class.UNIVERSAL ||
     safeContents.type !== asn1.Type.SEQUENCE ||
     safeContents.constructed !== true) {
    throw {
      message: 'PKCS#12 SafeContents expected to be a ' +
        'SEQUENCE OF SafeBag'
    };
  }

  var res = [];
  for(var i = 0; i < safeContents.value.length; i++) {
    var safeBag = safeContents.value[i];

    // validate SafeBag and capture data
    var capture = {};
    var errors = [];
    if(!asn1.validate(safeBag, safeBagValidator, capture, errors)) {
      throw {
        message: 'Cannot read SafeBag.',
        errors: errors
      };
    }

    /* Create bag object and push to result array. */
    var bag = {
      type: asn1.derToOid(capture.bagId),
      attributes: _decodeBagAttributes(capture.bagAttributes)
    };
    res.push(bag);

    var validator, decoder;
    var bagAsn1 = capture.bagValue.value[0];
    switch(bag.type) {
      case oids.pkcs8ShroudedKeyBag:
        /* bagAsn1 has a EncryptedPrivateKeyInfo, which we need to decrypt.
           Afterwards we can handle it like a keyBag,
           which is a PrivateKeyInfo. */
        if(password === undefined) {
          throw {
            message: 'Found PKCS#8 ShroudedKeyBag but no password available.'
          };
        }

        bagAsn1 = pki.decryptPrivateKeyInfo(bagAsn1, password);
        if(bagAsn1 === null) {
          throw {
            message: 'Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?'
          };
        }

        /* fall through */
      case oids.keyBag:
        /* A PKCS#12 keyBag is a simple PrivateKeyInfo as understood by our
           PKI module, hence we don't have to do validation/capturing here,
           just pass what we already got. */
        bag.key = pki.privateKeyFromAsn1(bagAsn1);
        continue;  /* Nothing more to do. */

      case oids.certBag:
        /* A PkCS#12 certBag can wrap both X.509 and sdsi certificates.
           Therefore put the SafeBag content through another validator to
           capture the fields.  Afterwards check & store the results. */
        validator = certBagValidator;
        decoder = function() {
          if(asn1.derToOid(capture.certId) !== oids.x509Certificate) {
            throw {
              message: 'Unsupported certificate type, only X.509 supported.',
              oid: asn1.derToOid(capture.certId)
            };
          }

          bag.cert = pki.certificateFromAsn1(asn1.fromDer(capture.cert));
        };
        break;

      default:
        throw {
          message: 'Unsupported PKCS#12 SafeBag type.',
          oid: bag.type
        };
    }

    /* Validate SafeBag value (i.e. CertBag, etc.) and capture data if needed. */
    if(validator !== undefined &&
       !asn1.validate(bagAsn1, validator, capture, errors)) {
      throw {
        message: 'Cannot read PKCS#12 ' + validator.name,
        errors: errors
      };
    }

    /* Call decoder function from above to store the results. */
    decoder();
  }

  return res;
}