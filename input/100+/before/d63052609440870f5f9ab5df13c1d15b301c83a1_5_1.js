function (refinementBufferView) 
{
	var start = Date.now();
	
	var i, c, nc, attrib, attributeLeftShift;
	var dataChunk;
	
	var m = attribArrays.length;
	
	for (i = m; i--; ) {
		attrib = attribArrays[i];
		nc	   = attrib.numComponents;
		
		attributeLeftShift 	   = (strideReading * 8) - attrib.readOffset - attrib.numBitsPerComponentPerLevel * nc;	
		attrib.precisionOffset = attrib.numBitsPerComponent - attrib.numBitsPerComponentPerLevel -
								 (refinementsDone * attrib.numBitsPerComponentPerLevel);
							
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
		
	var writeTargetNor = attribArrays[0].bufferView;
	var writeTargetPos = attribArrays[1].bufferView;
	var norPrecOff	   = attribArrays[0].precisionOffset;
	var posPrecOff	   = attribArrays[1].precisionOffset;
	var idxNor   	   = 0;
	var idxPos   	   = 0;
	
	var n1, n2, p1, p2, p3;
	
	for (i = 0; i < n; ++i) {		
		dataChunk = refinementBufferView[i];
		
		n1   = (dataChunk & 0x80) >>> 7;
		n1 <<= norPrecOff;
		
		n2   = (dataChunk & 0x40) >>> 6;
		n2 <<= norPrecOff;
		
		writeTargetNor[idxNor++] |= n1;
		writeTargetNor[idxNor++] |= n2;
		
		p1   = (dataChunk & 0x30) >>> 4;
		p1 <<= posPrecOff; 
		
		p2   = (dataChunk & 0x0C) >>> 2;
		p2 <<= posPrecOff;
		
		p3 	 = (dataChunk & 0x03);
		p3 <<= posPrecOff;
		
		writeTargetPos[idxPos++] |= p1;
		writeTargetPos[idxPos++] |= p2;
		writeTargetPos[idxPos++] |= p3;
	}

	//renewed per call due to changing buffer ownership
	var attributeArrayBuffers = [];
	
	if (interleavedMode) {
		attributeArrayBuffers[0] = attribArrays[0].bufferView.buffer;
	}
	else {
		for (i = 0; i < attribArrays.length; ++i) {
			attributeArrayBuffers[i] = attribArrays[i].bufferView.buffer;		
		}
	}
	
	postMessage({msg  : 'decodeTime',
               time : (Date.now() - start)});
	
	//send back the attribute buffer references
	postMessage({msg			  	         : 'refinementDone',
               attributeArrayBuffers : attributeArrayBuffers},
               attributeArrayBuffers);
				 				 
	++refinementsDone;	
}