function(count, boneCount) {
  count |= 0;
  var weights = new Float32Array(count*5);
  for (var i=0, off=0; i+3<count; i+=3, off+=15) {
    var len = 0 | (Math.random()+1);
    weights[off] = weights[off+5] = weights[off+10] = len;
    for (var j=0; j<len; j++) {
      weights[off+6+j*2] =
      weights[off+11+j*2] =
      weights[off+1+j*2] = 0 | (Math.random()*boneCount);
      weights[off+7+j*2] =
      weights[off+12+j*2] =
      weights[off+2+j*2] = Math.random();
    }
  }
  for (; i<count; i++, off+=5) {
    var len = 0 | (Math.random()+1);
    weights[off] = len;
    for (var j=0; j<len; j++) {
      weights[off+1+j*2] = 0 | (Math.random()*boneCount);
      weights[off+2+j*2] = Math.random();
    }
  }
  return weights;
}