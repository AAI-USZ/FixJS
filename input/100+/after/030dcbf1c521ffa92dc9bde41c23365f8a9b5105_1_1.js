function disassemble (data, offset, print_func) {
	var hex = [];
	data = data.replace(/\s+/g, "");

  for (var i = 0; i < data.length; i += 2) {
    hex.push(parseInt(data.substr(i, 2), 16));
  }

  if (typeof offset === "undefined") {
  	offset = 0;
  }

  //By default, log to console
  if (typeof print_func === "undefined") {
  	print_func = function (str) {
  		console.log(str);
  	}
  }

  for (var i = 0; i < hex.length;) {
  	var opcode = OPS[hex[i]];

  	if (typeof opcode === "undefined") {
  		print_func("#" + formatHex(hex[i], 2));
  		i += 1;
    } else {
	  	var bytes = opcode.bytes;
	  	var args = hex.slice(i+1, i+1+bytes);

	  	print_func(opcode.toString.call(opcode, args));  	
	  	
	  	//Print out the arguments at their correct lines,
	  	//but make sure not to format them as opcodes
	  	for (var x = i+1; x < i + bytes; x++) {
	  		print_func("[#" + formatHex(hex[x], 2) + "]");
	  	}

	  	i += bytes;
	  }
  }

  return hex;
}