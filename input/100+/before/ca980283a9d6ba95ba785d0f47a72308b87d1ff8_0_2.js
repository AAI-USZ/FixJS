function(chunk) {
	var offset = 4;
	var header = '' + chunk[0];
	var version = parseInt(header[0], 10).toString(16);
	var opcode = parseInt(header[1], 10).toString(16);
	var hexSeq ='';
	if(chunk[1] > 0){
		hexSeq += parseInt(chunk[1],10).toString();
	}
	if(parseInt(chunk[2],10).toString(16).length < 2){
		hexSeq += '0' + parseInt(chunk[2],10).toString(16);
	}else{
		hexSeq += parseInt(chunk[2],10).toString(16);
	}
	var id = parseInt(parseInt(hexSeq,16).toString(10));

	return {
		version:version,
		opcode:opcode,
		id : id,
		seq:chunk[3],
		payload : chunk.slice(offset)
	};
}