function() {
  var cert = {};
  cert.version = 0x02;
  cert.serialNumber = '00';
  cert.signatureOid = null;
  cert.signature = null;
  cert.validity = {};
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();

  cert.issuer = {};
  cert.issuer.getField = function(sn) {
    return _getAttribute(cert.issuer, sn);
  };
  cert.issuer.attributes = [];
  cert.issuer.hash = null;

  cert.subject = {};
  cert.subject.getField = function(sn) {
    return _getAttribute(cert.subject, sn);
  };
  cert.subject.attributes = [];
  cert.subject.hash = null;

  cert.extensions = [];
  cert.publicKey = null;
  cert.md = null;

  /**
   * Fills in missing fields in attributes.
   *
   * @param attrs the attributes to fill missing fields in.
   */
  var _fillMissingFields = function(attrs) {
    var attr;
    for(var i = 0; i < attrs.length; ++i) {
      attr = attrs[i];

      // populate missing name
      if(typeof(attr.name) === 'undefined') {
        if(attr.type && attr.type in pki.oids) {
          attr.name = pki.oids[attr.type];
        }
        else if(attr.shortName && attr.shortName in _shortNames) {
          attr.name = pki.oids[_shortNames[attr.shortName]];
        }
      }

      // populate missing type (OID)
      if(typeof(attr.type) === 'undefined') {
        if(attr.name && attr.name in pki.oids) {
          attr.type = pki.oids[attr.name];
        }
        else {
          throw {
            message: 'Attribute type not specified.',
            attribute: attr
          };
        }
      }

      // populate missing shortname
      if(typeof(attr.shortName) === 'undefined') {
        if(attr.name && attr.name in _shortNames) {
          attr.shortName = _shortNames[attr.name];
        }
      }

      if(typeof(attr.value) === 'undefined') {
        throw {
          message: 'Attribute value not specified.',
          attribute: attr
        };
      }
    }
  };

  /**
   * Sets the subject of this certificate.
   *
   * @param attrs the array of subject attributes to use.
   * @param uniqueId an optional a unique ID to use.
   */
  cert.setSubject = function(attrs, uniqueId) {
    // set new attributes, clear hash
    _fillMissingFields(attrs);
    cert.subject.attributes = attrs;
    delete cert.subject.uniqueId;
    if(uniqueId) {
      cert.subject.uniqueId = uniqueId;
    }
    cert.subject.hash = null;
  };

  /**
   * Sets the issuer of this certificate.
   *
   * @param attrs the array of issuer attributes to use.
   * @param uniqueId an optional a unique ID to use.
   */
  cert.setIssuer = function(attrs, uniqueId) {
    // set new attributes, clear hash
    _fillMissingFields(attrs);
    cert.issuer.attributes = attrs;
    delete cert.issuer.uniqueId;
    if(uniqueId) {
      cert.issuer.uniqueId = uniqueId;
    }
    cert.issuer.hash = null;
  };

  /**
   * Sets the extensions of this certificate.
   *
   * @param exts the array of extensions to use.
   */
  cert.setExtensions = function(exts) {
    var e;
    for(var i = 0; i < exts.length; ++i) {
      e = exts[i];

      // populate missing name
      if(typeof(e.name) === 'undefined') {
        if(e.id && e.id in pki.oids) {
          e.name = pki.oids[e.id];
        }
      }

      // populate missing id
      if(typeof(e.id) === 'undefined') {
        if(e.name && e.name in pki.oids) {
          e.id = pki.oids[e.name];
        }
        else {
          throw {
            message: 'Extension ID not specified.',
            extension: e
          };
        }
      }

      // handle missing value
      if(typeof(e.value) === 'undefined') {
        // value is a BIT STRING
        if(e.name === 'keyUsage') {
          // build flags
          var unused = 0;
          var b2 = 0x00;
          var b3 = 0x00;
          if(e.digitalSignature) {
            b2 |= 0x80;
            unused = 7;
          }
          if(e.nonRepudiation) {
            b2 |= 0x40;
            unused = 6;
          }
          if(e.keyEncipherment) {
            b2 |= 0x20;
            unused = 5;
          }
          if(e.dataEncipherment) {
            b2 |= 0x10;
            unused = 4;
          }
          if(e.keyAgreement) {
            b2 |= 0x08;
            unused = 3;
          }
          if(e.keyCertSign) {
            b2 |= 0x04;
            unused = 2;
          }
          if(e.cRLSign) {
            b2 |= 0x02;
            unused = 1;
          }
          if(e.encipherOnly) {
            b2 |= 0x01;
            unused = 0;
          }
          if(e.decipherOnly) {
            b3 |= 0x80;
            unused = 7;
          }

          // create bit string
          var value = String.fromCharCode(unused);
          if(b3 !== 0) {
            value += String.fromCharCode(b2) + String.fromCharCode(b3);
          }
          else if(b2 !== 0) {
            value += String.fromCharCode(b2);
          }
          e.value = asn1.create(
            asn1.Class.UNIVERSAL, asn1.Type.BITSTRING, false, value);
        }
        // basicConstraints is a SEQUENCE
        else if(e.name === 'basicConstraints') {
          e.value = asn1.create(
            asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, []);
          // cA BOOLEAN flag defaults to false
          if(e.cA) {
            e.value.value.push(asn1.create(
              asn1.Class.UNIVERSAL, asn1.Type.BOOLEAN, false,
              String.fromCharCode(0xFF)));
          }
          if(e.pathLenConstraint) {
            var num = e.pathLenConstraint;
            var tmp = forge.util.createBuffer();
            tmp.putInt(num, num.toString(2).length)
            e.value.value.push(asn1.create(
              asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
              tmp.getBytes()));
          }
        }
        else if(e.name === 'subjectAltName' || e.name === 'issuerAltName') {
          // SYNTAX SEQUENCE
          e.value = asn1.create(
            asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, []);

          var altName;
          for(var n = 0; n < e.altNames.length; ++n) {
            altName = e.altNames[n];
            var value = altName.value;
            // handle OID
            if(altName.type === 8) {
              value = asn1.oidToDer(value);
            }
            e.value.value.push(asn1.create(
              asn1.Class.CONTEXT_SPECIFIC, altName.type, false,
              value));
          }
        }

        // ensure value has been defined by now
        if(typeof(e.value) === 'undefined') {
          throw {
            message: 'Extension value not specified.',
            extension: e
          };
        }
      }
    }

    // set new extensions
    cert.extensions = exts;
  };

  /**
   * Gets an extension by its name or id.
   *
   * @param options the name to use or an object with:
   *          name the name to use.
   *          id the id to use.
   *
   * @return the extension or null if not found.
   */
  cert.getExtension = function(options) {
    if(options.constructor == String) {
      options = {
        name: options
      };
    }

    var rval = null;
    var ext;
    for(var i = 0; rval === null && i < cert.extensions.length; ++i) {
      ext = cert.extensions[i];
      if(options.id && ext.id === options.id) {
        rval = ext;
      }
      else if(options.name && ext.name === options.name) {
        rval = ext;
      }
    }
    return rval;
  };

  /**
   * Signs this certificate using the given private key.
   *
   * @param key the private key to sign with.
   */
  cert.sign = function(key) {
    // TODO: get signature OID from private key
    cert.signatureOid = oids['sha1withRSAEncryption'];
    cert.md = forge.md.sha1.create();

    // get TBSCertificate, convert to DER
    var bytes = asn1.toDer(pki.getTBSCertificate(cert));

    // digest and sign
    cert.md.update(bytes.getBytes());
    cert.signature = key.sign(cert.md);
  };

  /**
   * Attempts verify the signature on the passed certificate using this
   * certificate's public key.
   *
   * @param child the certificate to verify.
   *
   * @return true if verified, false if not.
   */
  cert.verify = function(child) {
    var rval = false;

    if(child.md !== null) {
      // verify signature on cert using public key
      rval = cert.publicKey.verify(
        child.md.digest().getBytes(), child.signature);
    }

    return rval;
  };

  /**
   * Returns true if the passed certificate's subject is the issuer of
   * this certificate.
   *
   * @param parent the certificate to check.
   *
   * @return true if the passed certificate's subject is the issuer of
   *         this certificate.
   */
  cert.isIssuer = function(parent) {
    var rval = false;

    var i = cert.issuer;
    var s = parent.subject;

    // compare hashes if present
    if(i.hash && s.hash) {
      rval = (i.hash === s.hash);
    }
    // if all attributes are the same then issuer matches subject
    else if(i.attributes.length === s.attributes.length) {
      rval = true;
      var iattr, sattr;
      for(var n = 0; rval && n < i.attributes.length; ++n) {
        iattr = i.attributes[n];
        sattr = s.attributes[n];
        if(iattr.type !== sattr.type || iattr.value !== sattr.value) {
          // attribute mismatch
          rval = false;
        }
      }
    }

    return rval;
  };

  return cert;
}