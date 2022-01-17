f			//console.log("SHOULD ADD", shouldAdd);
			shouldAdd = typeof shouldAdd === "undefined" ? true : shouldAdd;
			//if(!shouldAdd) console.log("NOT ADDING", op.ugenVariable);
			if(typeof op === "object" && op !== null) {

				var memo = this.memo[op.name];
				if(memo && op.category !== "Bus") {
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
						
						var _name = op[i].ugenVariable;// this.generateSymbol("v");
												
						var objName = op[i].name && !op[i].dirty ? op[i].name : gen(op[i], codeDictionary, false);
						var _statement = "var {0} = {1}".format(_name, objName);
						
						statement += objName + ",";
					}
						
					statement += "]";
					
					op.ugenVariable = name;
					if(shouldAdd)
						codeDictionary.codeblock.push(statement);
					else
						console.log("NOT ADDING;")
						
				}else{
					var gen = this.generators[op.type];
					//console.log(gen);
					if(gen) {
						var objName = gen(op, codeDictionary, true); //op.name && !op.dirty ? op.ugenVariable : gen(op, codeDictionary);
						
						if(op.category !== "FX") {
							statement = "var {0} = {1}".format(name, objName);
						}else{
							statement = "{0} = {1}".format(op.source, objName);
						}
						if(shouldAdd)
							codeDictionary.codeblock.push(statement);
					}// else{
				}
				return name;
			}
			return op;
		},
