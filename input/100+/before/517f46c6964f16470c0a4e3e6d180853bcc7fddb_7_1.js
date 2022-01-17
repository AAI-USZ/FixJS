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
  test.equals(p12.safeContents[0].safeBags[1].type, forge.pki.oids.pkcs8ShroudedKeyBag);

  test.equals(p12.safeContents[1].encrypted, true);
  test.equals(p12.safeContents[1].safeBags.length, 6);
  test.equals(p12.safeContents[1].safeBags[0].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[1].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[2].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[3].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[4].type, forge.pki.oids.certBag);
  test.equals(p12.safeContents[1].safeBags[5].type, forge.pki.oids.certBag);

  test.done();
}