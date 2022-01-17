function(child) {
    var rval = false;

    if(child.md !== null) {
      // verify signature on cert using public key
      rval = cert.publicKey.verify(
        child.md.digest().getBytes(), child.signature);
    }

    return rval;
  }