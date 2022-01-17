function(event) {
	switch (event.data.cmd) {
		case 'setAttributes':
			var i;		
			for (i = 0; i < event.data.numAttributeComponents.length; ++i) {
				attribArrays[i] = new AttributeArray(event.data.numAttributeComponents[i],
													 event.data.numAttributeBytesPerComponent[i],
													 event.data.numAttributeBitsPerLevel[i],
													 event.data.attributeOffset[i]);				 
			}
			stride = event.data.stride;			
			break;
			
		case 'transferRefinementData':
			switch (stride) {
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
					postMessage('Refinement data not accepted: stride is ' + stride +
								', but must be set to 1, 2 or 4 before transferring refinement data.');
			}
			break;

		case 'refine':
			if (refinementsDone < refinementBufferViews.length && refinementBufferViews[refinementsDone]) {
				for (i = 0; i < attribArrays.length; ++i) {				
					switch (attribArrays[i].numBytesPerComponent) {						
						case 4 :
							attribArrays[i].bufferView = new Uint32Array(event.data.attributeArrayBuffers[i]);
							break;
						case 2 :
							attribArrays[i].bufferView = new Uint16Array(event.data.attributeArrayBuffers[i]);
							break;
						case 1 :
							attribArrays[i].bufferView = new Uint8Array(event.data.attributeArrayBuffers[i]);
							break;
						default:		
							postMessage('Unable to start refinement: no valid value (' + attribArrays[i].numBytesPerComponent +
										+ ' instead of 1, 2 or 4) set for bytesPerComponent of attribute array ' + i + '.');
					}
				}
				refineAttributeData(refinementBufferViews[refinementsDone]);				
			}
			break;
	}
}