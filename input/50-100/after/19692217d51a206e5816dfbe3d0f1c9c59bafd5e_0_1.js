function(reAdd){

  var totalBuffer = new Buffer(this.length);
  var lastFreeIndex = 0;
  var buffer;

  while(buffer = this.buffersList.shift()){
    buffer.copy(totalBuffer, lastFreeIndex);
    lastFreeIndex += buffer.length;
  }

  this.length = 0;
  reAdd && this.add(totalBuffer);

  return totalBuffer;
}