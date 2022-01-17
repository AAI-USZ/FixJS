function refineAttributeData(attribIndex, refinementBuffer) {
	if (refinementsDone >= availableRefinementLevels)
		return;
		
	//@todo: Check parameters!
	//...
	
	//@todo: if it works, check if converting some bitops to *2, /2 or + ops gives better performance,
	//		 as, according to 'Javascript. The Good Parts.', the internal format is always 'double'
	
	var attrib			= attribArrays[attribIndex];
	var attribArrayView = attrib.bufferView;
	
	//depending on the size of each element, we have to pick a matching view on the ArrayBuffer
	var refinementBufferView;	
	
	switch (attrib.stride) {
		case 4	:
			refinementBufferView = new Uint32Array(refinementBuffer);
			break;
		case 2	:
			refinementBufferView = new Uint16Array(refinementBuffer);
			break;
		case 1	:
		default :
			refinementBufferView = new Uint8Array(refinementBuffer);
	}
	
	var c;
	
	//generate bitmasks which will be used during data extraction
	var componentMask  = [];
	var componentShift = [];
	
	var newBitsPerComponent = attrib.bitsPerRefinement / attrib.numComponents;
	
	for (c = 0; c < attrib.numComponents; ++c) {
		componentShift[c] 	= (attrib.numComponents - 1 - c) * newBitsPerComponent;
		componentMask[c] 	= 0x00000000 | (Math.pow(2, newBitsPerComponent) - 1);
		componentMask[c]  <<= componentShift[c];
	}
	
	var dataChunk;
	var chunkComponents 	= [];
	var refinedBits 		= refinementsDone * attrib.bitsPerRefinement;	
	var rightShift 			= (attrib.stride * 8) - attrib.offset - attrib.bitsPerRefinement;
	var leftShift			= (attrib.bytesPerComponent * 8) - newBitsPerComponent - refinedBits;
	
	var baseIdx = 0;
	var i;
	
	for (i = 0; i < refinementBufferView.length; ++i) {	
		//extract refinement data chunk for the corresponding attribute
		dataChunk    = 0x00000000 | refinementBufferView[i];
		dataChunk >>>= rightShift;
		
		//extract and apply all components of the data chunk		
		for (c = 0; c < attrib.numComponents; ++c) {			
			chunkComponents[c] = dataChunk & componentMask[c];			
			//shift component to the matching position
			chunkComponents[c] >>>= componentShift[c];
			chunkComponents[c]  <<= leftShift;			
			
			//add data chunk to achieve a refinement			
			attribArrayView[baseIdx + c] |= chunkComponents[c];
		}
		
		baseIdx += attrib.numComponents;
	}
	
	var attribBuffers = [];
	for (i = 0; i < attribArrays.length; ++i){
		attribBuffers[i] = attribArrays[i].bufferView.buffer;		
	}	
	
	postMessage({msg			  : 'refinementDone',
				 lvl		      : refinementsDone,
				 attributeBuffers : attribBuffers},
				 attribBuffers);
				 				 
	++refinementsDone;	
}