function(){
		return this.getLocalFileHeader().length + this.compressedBuffer.byteLength;
	}