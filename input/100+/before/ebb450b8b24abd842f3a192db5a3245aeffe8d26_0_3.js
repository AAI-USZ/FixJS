function $$(compute, Var, calculation){
		if (typeof compute == "string") {
			calculation = new Function('x','return ['+compute+'\n,x]');
			compute = function(x, result){
				result = calculation(x);
				callbackVariable.x = result[1];
				return result[0];
			};
		}
		var hasRelatedVariable = typeof Var == "function",
		hasComputation = typeof compute == "function",
		
		callbackVariable = function(value) {
			if (arguments.length == 1) {
				callbackVariable.x = value;
				if (hasRelatedVariable) {
					Var(value);
				}
			} else {
				return callbackVariable.$();
			}
		};
		function evaluate(value){
			value = hasRelatedVariable ? Var() : callbackVariable.x;
			return hasComputation ? compute(value) : value;				
		}
		evaluate.toString = evaluate;
		jQuery.extend(callbackVariable, {
			x: 0,
			$: evaluate,
			toString: evaluate,
			_: {
				toString: callbackVariable.$
			},
			mod: function(val){
				return $$(function(x){
					return x % val;
				}, callbackVariable);
			},
			add: function(val){
				return $$(function(x){
					return x + val;
				}, callbackVariable);
			},
			neg: function(){
				return $$('-x', callbackVariable);
			},
			$$: function(compute){
				return $$(compute, callbackVariable);
			}
		});
		jQuery.each('abcdefghij', function(index, character){
			callbackVariable[index] = callbackVariable[character] = function(){
				callbackVariable(arguments[index]);
			};
		});
		
		return callbackVariable;
	}