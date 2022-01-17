function refinementFinishedCallback(buffer) {  
  console.log('=> Client received refined data for level ' + refinedLevels + '!');
          
  var normalBuffer,
      coordBuffer;
    
  if (UseInterleavedOutput) {					
    coordBuffer  = new Uint16Array(buffer);
  }
  else {
    normalBuffer = new Uint16Array(buffer);
    coordBuffer  = new Uint16Array(buffer);
  }

  if (UseInterleavedOutput) {
    numArrayElements = (coordBuffer.length * Uint16Array.BYTES_PER_ELEMENT * 8) / StrideInBits;
  }
  else {
    numArrayElements = coordBuffer.length / 3;
  }
  
  ++refinedLevels;
  
  var s = Date.now();
  
  //upload the VBO data to the GPU
  glContext.bindBuffer(glContext.ARRAY_BUFFER, glBuffers.positions);  
  glContext.bufferData(glContext.ARRAY_BUFFER, coordBuffer, glContext.STATIC_DRAW);
  
  console.log('*** GPU upload took ' + (Date.now() - s) + ' ms ***');
  
  //@todo: check this hack!
  drawAllowed = true;
  
  if (!UseInterleavedOutput) {
    glContext.bindBuffer(glContext.ARRAY_BUFFER, glBuffers.normals);
    glContext.bufferData(glContext.ARRAY_BUFFER, normalBuffer, glContext.STATIC_DRAW);
  }
  
  //enjoy it for a few secs :-)
  //sleep(1000);

  if (refinedLevels === NumLevels) {
    UpdateTotal(Date.now() - start_time);
  }
  else {
    bitComposer.refine(buffer);
  }
}