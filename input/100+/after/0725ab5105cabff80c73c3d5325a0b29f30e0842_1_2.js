function(chunk) {
	var offset = 4;
	var header = parseInt(chunk[0],10);
	var version = header >> 4;
	var opcode = header & 0xf;
	var id = (parseInt(chunk[1],10) << 8) + parseInt(chunk[2],10);
	
	return {
		version:version,
		opcode:opcode,
		id : id,
		seq:chunk[3],
		payload : chunk.slice(offset)
	};
}