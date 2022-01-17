function (level) 
{
	var start = Date.now();
	
  var refinementBufferView = refinementBufferViews[level];
  
	var i, c, nc, attrib, attributeLeftShift;
	var dataChunk;
	
	var m = attribArrays.length;
	
	for (i = 0; i < m; ++i) {
		attrib = attribArrays[i];
		nc	   = attrib.numComponents;
		
		attributeLeftShift 	   = (strideReading * 8) - attrib.readOffset - attrib.numBitsPerComponentPerLevel * nc;	
		attrib.precisionOffset = attrib.numBitsPerComponent - attrib.numBitsPerComponentPerLevel -
                             (level * attrib.numBitsPerComponentPerLevel);
							
		for (c = 0; c < nc; ++c) {
			attrib.componentLeftShift[c] = attributeLeftShift + (nc - c - 1) * attrib.numBitsPerComponentPerLevel;
			
			attrib.componentMask[c]    = 0 | (Math.pow(2, attrib.numBitsPerComponentPerLevel) - 1);
			attrib.componentMask[c]  <<= attrib.componentLeftShift[c];
		}
	}	
	
	var n = refinementBufferView.length;	
		
	var nc,
      writeTarget,
      baseIdx,
      idx;
		
	var component;
	
	// BEGIN INLINED LOOP
	//{	
		//j = 0:
		attrib = attribArrays[0];
	
		nc		      = attrib.numComponents;
		writeTarget = attrib.bufferView;
		baseIdx		  = 0;
		
		for (i = 0; i < n; ++i) {		
			dataChunk = refinementBufferView[i];
			
			for (c = 0; c < nc; ++c) {
				component = dataChunk & attrib.componentMask[c];			
				
				component >>>= attrib.componentLeftShift[c];
				component  <<= attrib.precisionOffset;
				
				idx 			        = baseIdx + c;
				writeTarget[idx] |= component;
			}
			
			baseIdx += attrib.strideWriting;
		}
				
		//j = 1:
		attrib = attribArrays[1];
	
		nc		      = attrib.numComponents;
		writeTarget = attrib.bufferView;
		baseIdx		  = 0;
		
		for (i = 0; i < n; ++i) {	
			dataChunk = refinementBufferView[i];
			
			for (c = 0; c < nc; ++c) {
				component = dataChunk & attrib.componentMask[c];			
				
				component >>>= attrib.componentLeftShift[c];
				component  <<= attrib.precisionOffset;
				
				idx 			        = baseIdx + c;
				writeTarget[idx] |= component;
			}
			
			baseIdx += attrib.strideWriting;
		}	
	//}
	//END INLINED LOOP

	//BEGIN OPTIMIZED LOOP
	//{		
  /*
		var writeTargetNor = attribArrays[0].bufferView;
		var writeTargetPos = attribArrays[1].bufferView;
		var norPrecOff	   = attribArrays[0].precisionOffset;
		var posPrecOff	   = attribArrays[1].precisionOffset;
		var idxNor   	     = 0;
		var idxPos   	     = 0;
    var norStrideWOff  = attribArrays[0].strideWriting - 2;
    var posStrideWOff  = attribArrays[1].strideWriting - 3;
		var n1, n2, p1, p2, p3;
		
		for (i = 0; i < n; ++i) {		
			dataChunk = refinementBufferView[i];
			
			n1   = (dataChunk & 0x80) >>> 7;
			n1 <<= norPrecOff;
			
			n2   = (dataChunk & 0x40) >>> 6;
			n2 <<= norPrecOff;
			
			writeTargetNor[idxNor++] |= n1;
			writeTargetNor[idxNor++] |= n2;
      
      idxNor += 4;
			
			p1   = (dataChunk & 0x30) >>> 4;
			p1 <<= posPrecOff; 
			
			p2   = (dataChunk & 0x0C) >>> 2;
			p2 <<= posPrecOff;
			
			p3 	 = (dataChunk & 0x03);
			p3 <<= posPrecOff;
			
			writeTargetPos[idxPos++] |= p1;
			writeTargetPos[idxPos++] |= p2;
			writeTargetPos[idxPos++] |= p3;
      
      idxPos += 3;
		}
  */
	//}
	//END OPTIMIZED LOOP

	postMessage({msg  : 'decodeTime',
               time : (Date.now() - start)});
                   
  //send back the attribute buffer references
  postMessage(attribArrays[0].bufferView.buffer,
             [attribArrays[0].bufferView.buffer]);
  			 				 
	++refinementsDone;	
}