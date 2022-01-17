function_names, function(name){
			placeholder[name] = function(){
				callStack._name = name;
				callStack._arguments = arguments; 
				callStack = callStack._next = {};
				return instantInvocation && instantInvocation() || placeholder;
			};
		}