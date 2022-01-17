function(m) {
  var pubKey = jwcrypto.loadPublicKey(m.pubkey);
  var privKey = jwcrypto.loadSecretKey(m.privkey);

  var expiration = new Date();
  // TODO confirm witih lloyd m.duration is in seconds so we must
  // scale it by 1000 for milliseconds
  expiration.setTime(new Date().valueOf() + (m.duration * 1000));

  cert.sign(
    pubKey,
    { email: m.email },
    { issuer: m.hostname, issueAt: new Date(), expiresAt: expiration },
    null,
    privKey,
    function(err, cert) {
      if (err) process.send({ success: false, reason: err });
      else process.send({ success: true, certificate: cert });
    });
}