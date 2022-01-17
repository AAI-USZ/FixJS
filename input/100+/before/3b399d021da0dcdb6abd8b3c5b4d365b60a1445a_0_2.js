function next_rpn(token) {
			// While there are input tokens left
			// Read the next token from input.
			// If the token is a value
			if (token.t === token_types.number || token.t === token_types.symbol) {
				// Push it onto the stack.
				rpn_stack.push(token.v);
			}
			// Otherwise,
			else {
				//the token is an operator (operator here includes both operators, and functions).
				// It is known a priori that the operator takes n arguments.
				var n = operators[token.v][2];
				// If there are fewer than n values on the stack
				if (rpn_stack.length < n) {
					// (Error) The user has not input sufficient values in the expression.
					throw (new SyntaxError('The \'' + token.v + '\' operator requires exactly ' + n + ' operands, whereas only ' + rpn_stack.length + ' ' + (rpn_stack.length === 1 ? 'was ': 'were ') + 'supplied, namely '+rpn_stack.toString()));
					// Else,
				} else {
					// Pop the top n values from the stack.
					var spliced = rpn_stack.splice( - n, n);
					//var values = ExpressionWithArray(spliced, token.v);
					// TODO: check non-binary operators
					// var values = spliced[0].apply(token.v, spliced.slice(1)[0]);
					var values = spliced[0][token.v](spliced.splice(1)[0]);
					// Evaluate the operator, with the values as arguments.
					//var evaled=(' ('+values[0]+token.v+values[1]+')');
					// Push the returned results, if any, back onto the stack.
					rpn_stack.push(values);
				}
			}
		}