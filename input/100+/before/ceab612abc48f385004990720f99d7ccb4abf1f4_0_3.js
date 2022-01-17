function(message, signature, cb) {
  var params = getParams(this.keysize);

  // extract r and s
  var hexlength = params.q_bitlength / 4;

  // we pre-pad with 0s because encoding may have gotten rid of some
  signature = hex_lpad(signature, hexlength * 2);

  // now this should only happen if the signature was longer
  if (signature.length != (hexlength * 2)) {
    //return cb("problem with r/s combo: " + signature.length + "/" + hexlength + " - " + signature);
    return cb("malformed signature");
  }
  
  var r = new BigInteger(signature.substring(0, hexlength), 16),
      s = new BigInteger(signature.substring(hexlength, hexlength*2), 16);

  // check rangeconstraints
  if ((r.compareTo(BigInteger.ZERO) < 0) || (r.compareTo(params.q) > 0)) {
    //return cb("problem with r: " + r.toString(16));
    return cb("invalid signature");
  }
  if ((s.compareTo(BigInteger.ZERO) < 0) || (s.compareTo(params.q) > 0)) {
    //return cb("problem with s");
    return cb("invalid signature");
  }

  var w = s.modInverse(params.q);
  var u1 = doHash(params.hashAlg, message, params.q).multiply(w).mod(params.q);
  var u2 = r.multiply(w).mod(params.q);
  var v = params.g
    .modPow(u1,params.p)
    .multiply(this.y.modPow(u2,params.p)).mod(params.p)
    .mod(params.q);

  cb(null, v.equals(r));
}