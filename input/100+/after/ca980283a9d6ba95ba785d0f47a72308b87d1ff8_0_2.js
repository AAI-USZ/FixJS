function(chunk) {
	var offset = 4;
	var header = '' + chunk[0];
	var version = parseInt(header[0], 10).toString(16);
	var opcode = parseInt(header[1], 10).toString(16);
	var id = (parseInt(chunk[1],10) << 8) + parseInt(chunk[2],10);
	
	return {
		version:version,
		opcode:opcode,
		id : id,
		seq:chunk[3],
		payload : chunk.slice(offset)
	};
}