function keysizeFromObject(obj) {
  var p = new BigInteger(obj.p, 16);
  var q = new BigInteger(obj.q, 16);
  var g = new BigInteger(obj.g, 16);

  var keysize = _getKeySizeFromBitlength(p.bitLength());
  var params = getParams(keysize);

  // we don't force this to be our parameters, no need

  /*
  // check!
  if (!p.equals(params.p))
    throw "bad p";

  if (!q.equals(params.q))
    throw "bad q";

  if (!g.equals(params.g))
    throw "bad g"; */

  return keysize;
}