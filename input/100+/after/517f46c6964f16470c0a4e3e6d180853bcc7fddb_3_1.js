function(obj, password) {
  // validate PFX and capture data
  var capture = {};
  var errors = [];
  if(!asn1.validate(obj, pfxValidator, capture, errors)) {
    throw {
      message: 'Cannot read PKCS#12 PFX. ' +
        'ASN.1 object is not an PKCS#12 PFX.',
      errors: errors
    };
  }

  var pfx = {
    version: capture.version.charCodeAt(0),
    safeContents: [],

    /**
     * Get bags with matching friendlyName attribute
     *
     * @param friendlyName The friendly name to search for
     * @param bagType Optional bag type to narrow search by
     * @return Array of bags with matching friendlyName attribute
     */
    getBagsByFriendlyName: function(friendlyName, bagType) {
      return _getBagsByAttribute(pfx.safeContents, 'friendlyName',
        friendlyName, bagType);
    },

    /**
     * Get bags with matching localKeyId attribute
     *
     * @param localKeyId The localKeyId name to search for
     * @param bagType Optional bag type to narrow search by
     * @return Array of bags with matching localKeyId attribute
     */
    getBagsByLocalKeyId: function(localKeyId, bagType) {
      return _getBagsByAttribute(pfx.safeContents, 'localKeyId',
        localKeyId, bagType);
    }
  };

  if(capture.version.charCodeAt(0) !== 3) {
    throw {
      message: 'PKCS#12 PFX of version other than 3 not supported.',
      version: capture.version.charCodeAt(0)
    };
  }

  if(asn1.derToOid(capture.contentType) !== oids.data) {
    throw {
      message: 'Only PKCS#12 PFX in password integrity mode supported.',
      oid: asn1.derToOid(capture.contentType)
    };
  }

  var data = capture.content.value[0];
  if(data.tagClass !== asn1.Class.UNIVERSAL ||
     data.type !== asn1.Type.OCTETSTRING) {
    throw {
      message: 'PKCS#12 authSafe content data is not a OCTET STRING'
    };
  }

  _decodeAuthenticatedSafe(pfx, data.value, password);
  return pfx;
}