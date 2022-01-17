function(){
		var view = new DataView(new ArrayBuffer(26)),
			compsize = this.compressedBuffer.byteLength,
			uncompsize = this.buffer.byteLength;
		view.setUint16(0, 10, true);
		view.setUint16(2, 0, true);
		view.setUint16(4, this.deflateFlag, true);
		view.setUint16(6, getFileTime(this.date), true);
		view.setUint16(8, getFileDate(this.date), true);
		view.setUint32(10, jz.algorithms.crc32(this.buffer), true);
		view.setUint32(14, compsize, true);
		view.setUint32(18, uncompsize, true);
		view.setUint16(22, this.filename.length, true);
		view.setUint16(24, 0, true);
		return new Uint8Array(view.buffer);
	}