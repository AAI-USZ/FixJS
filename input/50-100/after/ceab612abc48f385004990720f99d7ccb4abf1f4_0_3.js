function(y, keysize, params) {
  this.y = y;

  if (keysize && params) {
    this.keysize = keysize;
    
    // copy params
    this.q = params.q; this.g = params.g; this.p = params.p;
  }
}