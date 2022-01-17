function() {
			var lambdaArgs = arguments,
				scope = { },
				expression = copyList(body),
				result, i;
			
			if (args.length !== lambdaArgs.length) {
				throw 'argument length doesn\'t match';
			}
			
			scopeStack.push(scope);
			var i;
			for (i = 0; i < args.length; i++) {
				scope[args[i]] = lambdaArgs[i];
			}
				
			result = evaluate(macroExpand(expression));
			
			scopeStack.pop();
			
			return result;
		}