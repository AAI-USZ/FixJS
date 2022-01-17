function HeaderBuilder(buffer, compressedBuffer, filename, date, offset, isDir, isDeflate){
	this.buffer = buffer;
	this.compressedBuffer = compressedBuffer;
	this.filename = filename;
	this.date = date;
	this.offset = offset;
	this.dirFlag = isDir ? 0x10 : 0;
	this.deflateFlag = isDeflate ? 0x8 : 0;
	this._commonHeader = this._getCommonHeader();
	this._cache = {lf: null, cd: null};
}