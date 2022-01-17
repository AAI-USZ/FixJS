function(p12Der, password) {
        var p12Asn1 = forge.asn1.fromDer(p12Der);
        var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

        /* Find the signature key by its friendlyName. */
        var keyBag = p12.getBagsByFriendlyName('signaturekey');
        if(keyBag.length !== 1) {
            throw {
                message: 'PKCS#12 PFX has not exactly one ' +
                    'bag named signaturekey.'
            };
        }
        keyBag = keyBag[0];

        /* The signature key keybag has a localKeyId attached,
           that matches the localKeyId of one of the certBags
           available.  Find that certBag now. */
        var certBag = p12.getBagsByLocalKeyId(keyBag.attributes.localKeyId[0],
            forge.pki.oids.certBag);
        if(certBag.length !== 1) {
            throw {
                message: 'PKCS#12 PFX has not exactly one certificate ' +
                    'bag with localKeyId matching signaturekey.',
                localKeyId: keyBag.attributes.localKeyId[0]
            };
        }
        certBag = certBag[0];

        /* Keep the loaded key & cert in the object instance for later use. */
        this.key = keyBag.key;
        this.cert = certBag.cert;
    }