function(numComponents, bytesPerComponent, bitsPerRefinement, offset) {
	//---------------------------------
	//static general information
	this.numComponents 	   = numComponents;	
	this.bytesPerComponent = bytesPerComponent;	
	
	//---------------------------------
	//static refinement information
	this.bitsPerRefinement = bitsPerRefinement;
	this.offset			   = offset;
	this.componentMask     = [];
	this.componentShift    = [];
	
	var c;
	for (c = 0; c < this.numComponents; ++c) {
		this.componentShift[c] 	 = (this.numComponents - 1 - c) * this.bitsPerRefinement;
		this.componentMask[c] 	 = 0x00000000 | (Math.pow(2, this.bitsPerRefinement) - 1);
		this.componentMask[c]  <<= this.componentShift[c];
	}
	
	//---------------------------------
	//dynamic refinement information
	this.rightShift 	 = 0;
	this.leftShift 	     = 0;
	this.baseIdx 		 = 0;
	this.shiftedChunk	 = 0;
	this.chunkComponents = [];
}