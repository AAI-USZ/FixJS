function(count, boneCount) {
  var weights = new Float32Array(count*5);
  for (var i=0, off=0; i<count; i++, off+=5) {
    var len = 0 | (Math.random()+1);
    weights[off] = len;
    for (var j=0; j<len; j++) {
      weights[off+1+j*2] = 0 | (Math.random()*boneCount);
      weights[off+2+j*2] = Math.random();
    }
  }
  return weights;
}