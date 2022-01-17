function(test) {
  var p12Der = fs.readFileSync(__dirname + '/_files/pkcs12_encmixed.p12', 'binary');
  var p12Asn1 = forge.asn1.fromDer(p12Der);

  var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, '123456');
  test.equals(p12.version, 3);

  /* The PKCS#12 PFX has two SafeContents instances,
     the first one is *not* encrypted, but contains two shrouded keys,
     the second one is encrypted and has six certificates in it. */
  test.equals(p12.safeContents.length, 2);

  test.equals(p12.safeContents[0].encrypted, false);
  test.equals(p12.safeContents[0].safeBags.length, 2);
  test.equals(p12.safeContents[0].safeBags[0].type, forge.pki.oids.pkcs8ShroudedKeyBag);
  test.equals(p12.safeContents[0].safeBags[0].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[0].safeBags[0].attributes.friendlyName[0], 'encryptionkey');
  test.equals(p12.safeContents[0].safeBags[0].attributes.localKeyId.length, 1);
  test.equals(p12.safeContents[0].safeBags[0].attributes.localKeyId[0], 'Time 1311855238964');

  test.equals(p12.safeContents[0].safeBags[1].type, forge.pki.oids.pkcs8ShroudedKeyBag);
  test.equals(p12.safeContents[0].safeBags[1].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[0].safeBags[1].attributes.friendlyName[0], 'signaturekey');
  test.equals(p12.safeContents[0].safeBags[1].attributes.localKeyId.length, 1);
  test.equals(p12.safeContents[0].safeBags[1].attributes.localKeyId[0], 'Time 1311855238863');

  test.equals(p12.safeContents[1].encrypted, true);
  test.equals(p12.safeContents[1].safeBags.length, 6);

  test.equals(p12.safeContents[1].safeBags[0].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[0].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[1].safeBags[0].attributes.friendlyName[0], 'CN=1002753325,2.5.4.5=#130b3130303237353333323543');
  test.equals(p12.safeContents[1].safeBags[0].attributes.localKeyId.length, 1);
  test.equals(p12.safeContents[1].safeBags[0].attributes.localKeyId[0], 'Time 1311855238964');

  test.equals(p12.safeContents[1].safeBags[1].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[1].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[1].safeBags[1].attributes.friendlyName[0], 'CN=ElsterSoftTestCA,OU=CA,O=Elster,C=DE');

  test.equals(p12.safeContents[1].safeBags[2].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[2].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[1].safeBags[2].attributes.friendlyName[0], 'CN=ElsterRootCA,OU=RootCA,O=Elster,C=DE');

  test.equals(p12.safeContents[1].safeBags[3].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[3].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[1].safeBags[3].attributes.friendlyName[0], 'CN=1002753325,2.5.4.5=#130b3130303237353333323541');
  test.equals(p12.safeContents[1].safeBags[3].attributes.localKeyId.length, 1);
  test.equals(p12.safeContents[1].safeBags[3].attributes.localKeyId[0], 'Time 1311855238863');

  test.equals(p12.safeContents[1].safeBags[4].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[4].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[1].safeBags[4].attributes.friendlyName[0], 'CN=ElsterSoftTestCA,OU=CA,O=Elster,C=DE');

  test.equals(p12.safeContents[1].safeBags[5].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[5].attributes.friendlyName.length, 1);
  test.equals(p12.safeContents[1].safeBags[5].attributes.friendlyName[0], 'CN=ElsterRootCA,OU=RootCA,O=Elster,C=DE');

  test.done();
}