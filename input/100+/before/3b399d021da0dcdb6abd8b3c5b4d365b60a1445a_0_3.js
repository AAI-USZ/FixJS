function next_token(token) {
		    if (token.t === token_types.symbol) {
				if (token.v[0] === '\\') {
					//Latex names
					token.v = token.v.substring(1);
				}
				//'Keyword' search: eg. break, if. Stuff like that.
				if (operators[token.v]) {
					token.t = token_types.operator;
				} else if (token.v === 'false') {
					token.v = false;
				} else if (token.v === 'true') {
					token.v = true;
				} else if (token.v === 'Infinity') {
					token.v = Infinity;
				} else if (typeof token.v === 'string') {
				    if (context[token.v]) {
				        //Make .v a pointer to the referenced object.
				        token.v = context[token.v];
					} else if (free_context[token.v]) {
						token.v = free_context[token.v];
				    } else {
    				    token.v = free_context[token.v] = new Expression.Symbol.Real(token.v);
				    }
				}
			}
			//console.log('token: ', token.v, names[token.t]);
			//Comments from http://en.wikipedia.org/wiki/Shunting-yard_algorithm
			// Read a token.
			// If the token is a number, then add it to the output queue.
			if (token.t === token_types.number || token.t === token_types.symbol) {
				if (token.t == token_types.number) {
					token.v = language.Number(token.v);
					//token.v = new Expression.NumericalReal(Number(token.v), 0);
				}
				next_rpn(token);
			}
			// If the token is an operator
			if (token.t === token_types.operator) {
				//, o1, then:
				var o1 = token;
				var o1precedence = operators[o1.v][1];
				//var o1associative=associativity(o1.v);
				var o1associative = operators[o1.v][0];
				// ('o2 ' is assumed to exist)
				var o2;
				// while
				while (
				//there is an operator token, o2, at the top of the stack
				(stack.length && (o2 = stack[stack.length - 1]).t === token_types.operator)
				//and
				&&
				// either
				(
				//o1 is left-associative and its precedence is less than or equal to that of o2,
				(o1associative == left && o1precedence <= operators[o2.v][1])
				//or
				||
				//o1 is right-associative and its precedence is less than that of o2
				(o1associative != left && o1precedence < operators[o2.v][1])

				)

				) {
					// pop o2 off the stack, onto the output queue;
					next_rpn(stack.pop());
				}

				// push o1 onto the stack.
				stack.push(o1);
			}
			// If the token is a left parenthesis,
			if (token.t === token_types.parenopen) {
				//then push it onto the stack.
				stack.push(token);
			}
			// If the token is a right parenthesis:
			if (token.t === token_types.parenclose) {
				// Until the token at the top of the stack is a left parenthesis,
				while (stack[stack.length - 1].t !== token_types.parenopen) {
					// If the stack runs out without finding a left parenthesis, then
					if (!stack.length) {
						//there are mismatched parentheses.
						throw (new SyntaxError(msg.parenMismatch));
					}
					// pop operators off the stack onto the output queue.
					next_rpn(stack.pop());
				}

				// Pop the left parenthesis from the stack, but not onto the output queue.
				if (stack.pop().t !== token_types.parenopen) {
					throw ('Pop the left parenthesis from the stack: Not found ! ')
				}
			}
		}