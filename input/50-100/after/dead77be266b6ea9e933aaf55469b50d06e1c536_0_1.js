function(count) {
  count |= 0;
  var arr = new Float32Array(count*4);
  for (i=0; i<arr.length; i+=4) {
    arr[i] = 0;
    arr[i+2] = 0;
    arr[i+2] = 0;
    arr[i+3] = 1;
  }
  return arr;
}