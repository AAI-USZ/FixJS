function refineAttributeData(refinementBufferView) {
	//@todo: if it works, check if converting some bitops to *2, /2 or + ops gives better performance,
	//		 as, according to 'Javascript. The Good Parts.', the internal format is always 'double'
	
	var i, c, attrib;
	var dataChunk;
	
	for (i = 0; i < attribArrays.length; ++i) {
		attrib		  	  = attribArrays[i];
		
		attrib.rightShift = stride * 8 - attrib.offset - attrib.bitsPerRefinement * attrib.numComponents;	
		attrib.leftShift  = (attrib.bytesPerComponent * 8) - attrib.bitsPerRefinement -
							(refinementsDone * attrib.bitsPerRefinement);
		attrib.baseIdx	  = 0;
	}
	
	for (i = 0; i < refinementBufferView.length; ++i) {		
		//extract refinement data chunk as 32 bit data
		dataChunk = 0x00000000 | refinementBufferView[i];
		
		//apply data chunk to all attribute arrays
		for (j = 0; j < attribArrays.length; ++j) {
			attrib = attribArrays[j];
			
			attrib.shiftedChunk = dataChunk >>> attrib.rightShift;
		
			for (c = 0; c < attrib.numComponents; ++c) {		
				attrib.chunkComponents[c] = attrib.shiftedChunk & attrib.componentMask[c];			
				
				attrib.chunkComponents[c] >>>= attrib.componentShift[c];
				attrib.chunkComponents[c]  <<= attrib.leftShift;
								
				attrib.bufferView[attrib.baseIdx + c] |= attrib.chunkComponents[c];			
			}
			
			attrib.baseIdx += attrib.numComponents;
		}
	}
	
	//renewed per call due to changing buffer ownership
	var attribBuffers = [];
	for (i = 0; i < attribArrays.length; ++i) {
		attribBuffers[i] = attribArrays[i].bufferView.buffer;		
	}
	
	//send back the attribute buffer references
	postMessage({msg			  : 'refinementDone',
				 lvl		      : refinementsDone,
				 attributeBuffers : attribBuffers},
				 attribBuffers);
				 				 
	++refinementsDone;	
}