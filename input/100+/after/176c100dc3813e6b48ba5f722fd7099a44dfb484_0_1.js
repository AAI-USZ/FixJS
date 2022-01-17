function(tokenizedLines) {
		
		var offset = 0;
		var output = new Listing();
		var errorMap = {};
	
		// perform a first pass to estimate the offset associated with each label
		for(var i = 0; i < tokenizedLines.length; i++) {
			var line = tokenizedLines[i];
			
			var command = null;
			var dat = null;
			
			try {
			
				for(var j = 0; j < line.length; j++) {
					var token = line[j];
					
					// handle initial operation
					if(command == null && dat == null) {
						if(token.type == "space" || token.type == "comment") { }
						else if(token.type == "command") {
							command = token;
							offset++;
						}
						else if(token.type == "label_def") {
							var labelName = token.lexeme.substr(1).toLowerCase();
							if(output.labels[labelName] != null) this.throwInvalid(j, token, "Duplicate label definition (" + labelName + ")");
							
							output.labels[labelName] = offset;
						}
						else if(token.type == "reserved_word" && token.lexeme == "DAT") {
							dat = token;
						}
						else {
							this.throwInvalid(i+1, token);
						}
					}
					// handle arguments
					else {
						if(command != null) {
							var arg = this.compileArgument(line, j, i+1, null);
							if(arg.nextWord != null) 
								offset++;
							j += arg.tokenCount;
						}
						else if(dat != null) {
							// data blocks
							if(token.type == "decimal" || token.type == "hexidecimal") {
								offset++;
							}
							else if(token.type == "string") {
								// remove quotes
								var str = token.lexeme.substr(1, token.lexeme.length-2);
								offset += str.length;
							}
						}
					}
				}
			}
			catch(e) {
				output.errors.push(e);
				errorMap[""+i] = e;
			}
		}
		
		offset = 0;
		
		// perform second pass to generate bytecode
		for(var i = 0; i < tokenizedLines.length; i++) {
			var line = tokenizedLines[i];
		
			// skip line if there is an error on it
			if(errorMap[""+i]) {
				output.addLine(offset, line, []);
				continue;
			}	

			var opcode = 0;
			var command = null;
			var arguments = [];
			var dat = null;
			var bytes = [];
			
			try {
				for(var j = 0; j < line.length; j++) {
					var token = line[j];
					
					// handle initial operation
					if(command == null && dat == null) {
						if(token.type == "space" || token.type == "comment") { }
						else if(token.type == "command") {
							command = token;
							opcode = eval("OPERATION_"+token.lexeme);
						}
						else if(token.type == "label_def") { }
						else if(token.type == "reserved_word" && token.lexeme == "DAT") {
							dat = [];
						}
						else {
							this.throwInvalid(i+1, token);
						}
					}
					// handle arguments
					else {
						if(command != null) {
							var arg = this.compileArgument(line, j, i+1, output.labels);
							if(arg.value != null)
								arguments.push(arg);
							j += arg.tokenCount;
						}
						else if(dat != null) {
							// data blocks
							if(token.type == "decimal" || token.type == "hexidecimal") {
								dat.push(parseInt(token.lexeme));
							}
							else if(token.type == "string") {
								// remove quotes 
								var str = token.lexeme.substr(1, token.lexeme.length-2);

								// push each character onto the program array
								for(var c = 0; c < str.length; c++) {
									dat.push(parseInt(str.charCodeAt(c)));
								}
							}
						}
					}
				}
				
				if(opcode != 0) {
					if(arguments.length == 0) 
						this.throwInvalid(i+1, null, "One or more parameters are required");
					if(arguments.length > 2) 
						this.throwInvalid(i+1, null, "Too many arguments");
					
					
					var param1 = arguments[0];
					var param2 = (arguments.length > 1) ? arguments[1] : { };
					
					//additionalInstructions
					
					if(arguments.length == 1) 
						bytes.push(Utils.makeSpecialInstruction(opcode, param1.value));
					else {
						bytes.push(Utils.makeInstruction(opcode, param2.value, param1.value));
					}
					
					if(param2.nextWord != null)
						bytes.push(param2.nextWord);
					
					if(param1.nextWord != null)
						bytes.push(param1.nextWord);
					
				}
				else if(dat != null) {
					for(var k = 0; k < dat.length; k++) {
						bytes.push(dat[k]);
					}
				}
			}
			catch(e) { 
				output.errors.push(e);
			}
			
			output.addLine(offset, line, bytes);
			offset += bytes.length;
			
		}
		
		return output;
		
	}