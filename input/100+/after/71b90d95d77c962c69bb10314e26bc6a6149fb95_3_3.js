function(op, codeDictionary, shouldAdd) {
			shouldAdd = typeof shouldAdd === "undefined" ? true : shouldAdd;
			
			if(typeof op === "object" && op !== null) {

				var memo = this.memo[op.name];
				if(memo){
					//console.log("MEMO", memo);
					return memo;
				}
				
				var name = op.ugenVariable || this.generateSymbol("v");
				
				op.ugenVariable = name;
				if(op.name) {
					this.memo[op.name] = op.ugenVariable;
				}
				
				var statement;
				if(typeof op === "object" && op instanceof Array) {
					statement = "var " + name + " = [";
					
					for(var i = 0; i < op.length; i++) {
						var gen = this.generators[op[i].type];
						
						var _name = op[i].ugenVariable;
												
						var objName = op[i].name && !op[i].dirty ? op[i].name : gen(op[i], codeDictionary, false);
						var _statement = "var {0} = {1}".format(_name, objName);
						
						statement += objName + ",";
					}
						
					statement += "]";
										
					if(shouldAdd)
						codeDictionary.codeblock.push(statement);
				}else{
					var gen = this.generators[op.type];
					if(gen) {
						var objName = gen(op, codeDictionary, shouldAdd);
						
						if(shouldAdd) {
							if(op.category !== "FX") {
								statement = "var {0} = {1}".format(name, objName);
							}else{
								statement = "{0} = {1}".format(op.source, objName);
							}
							codeDictionary.codeblock.push(statement);
						}
					}
				}
				return name;
			}
			return op;
		}