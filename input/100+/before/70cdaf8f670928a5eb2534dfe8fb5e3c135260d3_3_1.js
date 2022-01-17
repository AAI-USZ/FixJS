function(op, codeDictionary, shouldAdd) {
			shouldAdd = typeof shouldAdd === "undefined" ? true : shouldAdd;
			if(op.type === "=") { 
				return Gibberish.codegen(op.operands[1], codeDictionary, shouldAdd);
			}else if(op.type === "*" || op.type === "/" && op.operands === 1) {
				return Gibberish.codegen(op.operands[0], codeDictionary, shouldAdd);
			}
			return "({0} {1} {2})".format(	Gibberish.codegen(op.operands[0], codeDictionary, shouldAdd), 
											Gibberish.codegen(op.type, 	codeDictionary, shouldAdd),
											Gibberish.codegen(op.operands[1],	codeDictionary, shouldAdd));
		}