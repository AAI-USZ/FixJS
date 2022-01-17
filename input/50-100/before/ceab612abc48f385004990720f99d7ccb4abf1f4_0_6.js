function(obj) {
  this.x = new BigInteger(obj.x, 16);

  //this.keysize = obj.keysize;
  this.keysize = keysizeFromObject(obj);

  var params = getParams(keysize);
  
  // repetition, bad - FIXME
  this.y = params.g.modPow(this.x, params.p);

  return this;
}