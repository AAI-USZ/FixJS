function(event) {
	var i, j;
	var attributeArrayBuffer;
	var numBytesPerElement;
	
	switch (event.data.cmd) {
		case 'setAttributes':				
			for (i = 0; i < event.data.numAttributeComponents.length; ++i) {
				attribArrays[i] = new AttributeArray(event.data.numAttributeComponents[i],
													 event.data.numAttributeBitsPerComponent[i],
													 event.data.numAttributeBitsPerLevel[i] / event.data.numAttributeComponents[i],
													 event.data.attributeReadOffset[i]);
													 
				strideReading += event.data.numAttributeBitsPerLevel[i];
			}
			
			//if the offset and stride parameters are given, assume a single, interleaved output array
			if (event.data.offset && event.data.stride) {
				interleavedMode = true;
			}
			
			//guess strideReading by checking the number of bits per refinement
		    //usually, we expect this to be an exact multiple of 8, as one doesn't
			//want to waste space in the encoded data
			strideReading = Math.ceil(strideReading / 8);
			
			break;
			
		case 'transferRefinementData':
			switch (strideReading) {
				case 4 :
					refinementBufferViews[event.data.level] = new Uint32Array(event.data.arrayBuffer);
					break;
				case 2 :
					refinementBufferViews[event.data.level] = new Uint16Array(event.data.arrayBuffer);
					break;
				case 1 :
					refinementBufferViews[event.data.level] = new Uint8Array(event.data.arrayBuffer);
					break;
				default:
					postMessage('Refinement data not accepted: strideReading was found to be ' + strideReading +
								' bytes, but must be set to 1, 2 or 4 before transferring refinement data.');
			}
			break;

		case 'refine':
			if (refinementsDone < refinementBufferViews.length && refinementBufferViews[refinementsDone]) {
				
				for (i = 0; i < attribArrays.length; ++i) {					
					//if this is the first call, create the attribute array buffers
					if (!refinementsDone) {
						if (interleavedMode) {
							//in interleaved mode, all attributeArrays refer to the same buffer
							if (i === 0) {
								numBytesPerElement = 0;
								for (j = 0; j < attribArrays.length; ++j) {
									numBytesPerElement += attribArrays[i].numBitsPerComponent * attribArrays[i].numComponents;									
								}
								
								attributeArrayBuffer = new ArrayBuffer(numBytesPerElement * refinementBufferViews[refinementsDone].length);
							}
							else {
								attributeArrayBuffer = attribArrays[0].bufferView.buffer;
							}
						}
						else {
							numBytesPerElement   = attribArrays[i].numBitsPerComponent * attribArrays[i].numComponents;
							attributeArrayBuffer = new ArrayBuffer(numBytesPerElement * refinementBufferViews[refinementsDone].length);
						}
					}
					else {
						attributeArrayBuffer = event.data.attributeArrayBuffers[i];
					}
					
					switch (attribArrays[i].numBitsPerComponent) {						
						case 32 :
							attribArrays[i].bufferView = new Uint32Array(attributeArrayBuffer);
							break;
						case 16 :
							attribArrays[i].bufferView = new Uint16Array(attributeArrayBuffer);
							break;
						case 8 :
							attribArrays[i].bufferView = new Uint8Array(attributeArrayBuffer);
							break;
						default:		
							postMessage('Unable to start refinement: no valid value (' + attribArrays[i].numBitsPerComponent +
										+ ' instead of 1, 2 or 4) set for bytesPerComponent of attribute array ' + i + '.');
					}
				}
				refineAttributeData(refinementBufferViews[refinementsDone]);				
			} else {
				postMessage('Cannot process refinement: No refinement data loaded for the requested level ' + refinementsDone + '!');
			}
			break;
	}
}