function(numComponents, bytesPerComponent, bitsPerRefinement,
							  offset, stride, arrayBuffer) {	
	this.numComponents 	   = numComponents;	
	this.bytesPerComponent = bytesPerComponent;	
	this.bitsPerRefinement = bitsPerRefinement;
	this.offset			   = offset;
	this.stride 		   = stride;
	
	//@todo: throw error if bytesPerComponent is no valid number
	
	switch (this.bytesPerComponent) {
		case 4	:
			this.bufferView = new Uint32Array(arrayBuffer);
			break;
		case 2	:
			this.bufferView = new Uint16Array(arrayBuffer);
			break;
		case 1	:		
		default :		
			this.bufferView = new Uint8Array(arrayBuffer);
	}
}