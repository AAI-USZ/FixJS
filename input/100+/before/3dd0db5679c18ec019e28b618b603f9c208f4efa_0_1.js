function(tokens, start, lineNumber, labels) {
		var argument = new AssemblerArgument();
		var k;
		var openBracketCount = 0, closeBracketCount = 0, netBracketCount = 0;
		var lastOperator = null;
		var originalLength = tokens.length;
		
		tokens = this.evaluateExpression(tokens, start, lineNumber, labels);
		
		for(k = start; k < tokens.length; k++) {
			var token = tokens[k];
			
			if(token.type == "space") { }
			else if(token.type == "comma" || token.type == "comment") { 
				break;
			}
			else if(token.type == "decimal" || token.type == "hexidecimal" || token.type == "label_ref") {
				if(argument.expressionRegister != null && argument.expressionValue != null) this.throwInvalid(lineNumber, token);
				
				var val;
				if(token.type == "label_ref") {
					val = this.getLabelValue(token, labels);
				}
				else val = parseInt(token.lexeme);
				
				if(lastOperator != null && argument.expressionValue != null) {
					this.throwInvalid(lineNumber, token);
				}
				else argument.expressionValue = val;
				
				if(argument.memoryTarget) {
					if(argument.expressionRegister != null) {
						if(lastOperator == null) this.throwInvalid(lineNumber, token, "Missing operator");
						if(lastOperator != "+") this.throwInvalid(lineNumber, token, "The " + lastOperator + " operator can not be used when referencing a register");
						
						argument.value = eval("REGISTER_" + argument.expressionRegister) + Values.REGISTER_NEXT_WORD_OFFSET;
						argument.nextWord = argument.expressionValue;
						lastOperator = null;
					}
					else {
						argument.value  = Values.NEXT_WORD_VALUE;
						argument.nextWord = argument.expressionValue;
					}
				}
				else {
					if(argument.expressionRegister != null && lastOperator != null) this.throwInvalid(lineNumber, token, "Expressions can not contain registers unless using 'register plus next word'.");
				
					// literal
					var val32 = Utils.to32BitSigned(argument.expressionValue);
					if(val32 >= -1 && val32 <= 30 && token.type != "label_ref") {
						argument.value = Literals["L_"+val32];
						argument.nextWord = null;
					}
					else {
						argument.value = Values.NEXT_WORD_LITERAL;
						argument.nextWord = argument.expressionValue;
					}
				}
			}
			else if(token.type == "register") {
				if(argument.expressionValue == null) {
					argument.value = eval("REGISTER_" + token.lexeme) + (argument.memoryTarget ? Values.REGISTER_VALUE_OFFSET : 0);
					argument.expressionRegister = token.lexeme;
				}
				else {
					if(!argument.memoryTarget) this.throwInvalid(lineNumber, token);
					if(argument.expressionRegister) this.throwInvalid(lineNumber, token);
					if(lastOperator != "+") this.throwInvalid(lineNumber, token);
					
					argument.value = eval("REGISTER_" + token.lexeme) + Values.REGISTER_NEXT_WORD_OFFSET;
					argument.nextWord = argument.expressionValue;
					argument.expressionRegister = token.lexeme;
					lastOperator = null;
				}
			}
			else if(token.type == "reserved_word" && token.lexeme != "DAT") {
				if(argument.expressionValue != null || lastOperator != null) this.throwInvalid(lineNumber, token);
				
				if(token.lexeme == "POP")
					argument.value = Values.SP_OFFSET;
				else if(token.lexeme == "PUSH")
					argument.value = Values.SP_OFFSET;
				else if(token.lexeme == "PEEK")
					argument.value = Values.SP_OFFSET + 1;
			}
			else if(token.type == "open_bracket") {
				argument.memoryTarget = true;
				openBracketCount++;
				netBracketCount++;
				if(netBracketCount > 1) this.throwInvalid(lineNumber, null, "Unexpected [");
			}
			else if(token.type == "close_bracket") {
				if(lastOperator != null) this.throwInvalid(lineNumber, token);
				closeBracketCount++;
				netBracketCount--;
				if(netBracketCount < 0) this.throwInvalid(lineNumber, null, "Unexpected ]");
			}
			else if(token.type == "operator") {
				if(lastOperator != null) this.throwInvalid(lineNumber, token);
				lastOperator = token.lexeme;
			}
			else {
				this.throwInvalid(lineNumber, token);
			}
		}
		
		if(openBracketCount != closeBracketCount) this.throwInvalid(lineNumber, null, "Mismatched brackets");
		
		argument.tokenCount = k - start + (originalLength - tokens.length);
		return argument;
	}