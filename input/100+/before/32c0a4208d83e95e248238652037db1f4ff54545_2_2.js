function refinementFinishedCallback(attributeData) {  
  console.log('=> Client received refined data for level ' + refinedLevels + '!');
          
  var normalBuffer,
      coordBuffer;
  
  if (UseInterleavedOutput) {					
    coordBuffer  = new Uint16Array(attributeData.attributeArrayBuffers[0]);
  }
  else {
    normalBuffer = new Uint16Array(attributeData.attributeArrayBuffers[0]);
    coordBuffer  = new Uint16Array(attributeData.attributeArrayBuffers[1]);
  }
  
  if (UseInterleavedOutput) {
    numArrayElements = (coordBuffer.length * Uint16Array.BYTES_PER_ELEMENT * 8) / StrideInBits;
  }
  else {
    numArrayElements = coordBuffer.length / 3;
  }
  
  ++refinedLevels;
  
  //upload the VBO data to the GPU
  glContext.bindBuffer(glContext.ARRAY_BUFFER, glBuffers.positions);
  glContext.bufferData(glContext.ARRAY_BUFFER, coordBuffer, glContext.STATIC_DRAW);
  
  if (!UseInterleavedOutput) {
    glContext.bindBuffer(glContext.ARRAY_BUFFER, glBuffers.normals);
    glContext.bufferData(glContext.ARRAY_BUFFER, normalBuffer, glContext.STATIC_DRAW);
  }

  //enjoy it for a few secs :-)
  //sleep(1000);

  if (refinedLevels === 8) {
    UpdateTotal(Date.now() - start_time);
  }
  
  bitComposer.refine(attributeData.attributeArrayBuffers);
}