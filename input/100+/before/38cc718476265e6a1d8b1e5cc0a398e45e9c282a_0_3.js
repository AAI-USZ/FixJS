function(event) {
	switch (event.data.cmd) {
		case 'transferAttributeArray':
			transferAttributeArray(event.data.attribIndex,
								   event.data.numComponents,
								   event.data.bytesPerComponent,
								   event.data.bitsPerRefinement,
								   event.data.offset,
								   event.data.stride,
								   event.data.arrayBuffer);
			break;
			
		case 'transferRefinementData':
			refinementBuffers[event.data.level] = event.data.arrayBuffer;
			++availableRefinementLevels;
			break;
			
		case 'refine':
			refineAttributeData(0, refinementBuffers[refinementsDone]);
			break;
	}	
}