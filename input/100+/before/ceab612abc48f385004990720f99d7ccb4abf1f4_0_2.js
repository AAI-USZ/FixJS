function generate(keysize, rng, doneCB) {
  var params = getParams(keysize);
  if (!params)
    throw "keysize not supported: " + keysize.toString();

  var keypair = new algs.KeyPair();
  keypair.keysize= keysize;

  // DSA key gen: random x modulo q
  var x = randomNumberMod(params.q, rng);

  // the secret key will compute y
  keypair.secretKey = new SecretKey(x, keypair.keysize);
  keypair.publicKey = new PublicKey(keypair.secretKey.y, keypair.keysize);
  
  keypair.publicKey.algorithm = keypair.secretKey.algorithm = keypair.algorithm = 'DS';

  // XXX - timeout or nexttick?
  doneCB(null, keypair);
}