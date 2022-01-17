function _decodeAuthenticatedSafe(pfx, authSafe, password) {
  authSafe = asn1.fromDer(authSafe);  /* actually it's BER encoded */

  if(authSafe.tagClass !== asn1.Class.UNIVERSAL ||
     authSafe.type !== asn1.Type.SEQUENCE ||
     authSafe.constructed !== true) {
    throw {
      message: 'PKCS#12 AuthenticatedSafe expected to be a ' +
        'SEQUENCE OF ContentInfo'
    };
  }

  for(var i = 0; i < authSafe.value.length; i ++) {
    var contentInfo = authSafe.value[i];

    // validate contentInfo and capture data
    var capture = {};
    var errors = [];
    if(!asn1.validate(contentInfo, contentInfoValidator, capture, errors)) {
      throw {
        message: 'Cannot read ContentInfo. ',
        errors: errors
      };
    }

    var obj = {
      encrypted: false
    };
    var safeContents = null;
    var data = capture.content.value[0];
    switch(asn1.derToOid(capture.contentType)) {
      case oids.data:
        if(data.tagClass !== asn1.Class.UNIVERSAL ||
           data.type !== asn1.Type.OCTETSTRING) {
          throw {
            message: 'PKCS#12 SafeContents Data is not a OCTET STRING'
          };
        }
        safeContents = data.value;
        break;

      case oids.encryptedData:
        safeContents = _decryptSafeContents(data, password);
        obj.encrypted = true;
        break;

      default:
        throw {
          message: 'Unsupported PKCS#12 contentType.',
          contentType: asn1.derToOid(capture.contentType)
        };
    }

    obj.safeBags = _decodeSafeContents(safeContents, password);
    pfx.safeContents.push(obj);
  }
}