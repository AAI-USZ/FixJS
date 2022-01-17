function (window) {
	
	var lispx = { },
		scopeStack = [ ],
		macros, symbols;
	
	function foldLeft(list, init,  lambda) {
		var i;
		for (i = 0; i < list.length; i++) {
			init = lambda(init, list[i]);
		}
		return init;
	}
	
	function copyList(list) {
		var result = [],
			i;
		
		if (!Array.isArray(list)) {
			return list;
		}
		
		for (i = 0; i < list.length; i++) {
			result.push(copyList(list[i]));
		}
		
		return result;
	}	
	
	// macros: 
	// input: list of their tail
	// output: new list
	macros = { };
	macros['def'] = function (tail) {
		if (arguments.length !== 1) {
			throw 'def requires exactly two arguments.';
		}
		return [
			function () { 
				if (arguments.length !== 1) {
					throw 'invalid argument count for def.';
				}
				symbols[tail[0]] = arguments[0];
				return arguments[0];
			},
			tail[1]
		];
	};
	macros['if'] = function (tail) {
		var thenExpression, elseExpression;
		
		if (tail.length !== 2 && tail.length !== 3) {
			throw '\'if\' requires exactly two or three arguments';
		}
		
		thenExpression = macroExpand(tail[1]);
		if (tail.length === 3) {
			elseExpression = macroExpand(tail[2]);
		}
		
		return [
			function () {
				// redundant if..
				if (arguments.length !== 1) {
					throw '\'if\' requires condition';
				}
				if (arguments[0] === true) {
					return evaluate(copyList(thenExpression));
				}
				else if (elseExpression) {
					return evaluate(copyList(elseExpression));
				}
				return 'null';
			},
			tail[0]
		];
	};
	macros['set'] = function (tail) {
		if (tail.length !== 2) {
			throw '\'set\' requires exactly two arguments';
		}
		
		return [
			function () {
				if (typeof symbols[tail[0]] !== 'undefined') {
					symbols[tail[0]] = arguments[0];
					return arguments[0];
				}
				// TODO: remove eval evil...
				else if (typeof eval(tail[0]) !== 'undefined') {
					eval(tail[0] + ' = '  + arguments[0]);
					return arguments[0];
				}
				throw 'symbol \'' + tail[0] + '\' not found';
			},
			tail[1]
		];
	};
	macros['lambda'] = function (tail) {
		var args, body, lambda;
		
		if (tail.length !== 2) {
			throw '\'lambda\' requires two arguments: argument list and body expression';
		}
		args = tail[0];
		body = tail[1];
		
		var lambda = function() {
			var lambdaArgs = arguments,
				scope = { },
				expression = copyList(body),
				result, i;
			
			if (args.length !== lambdaArgs.length) {
				throw 'argument length doesn\'t match';
			}
			
			for (i = 0; i < args.length; i++) {
				scope[args[i]] = lambdaArgs[i];
			}
			
			scopeStack.push(scope);
			result = evaluate(macroExpand(expression));
			scopeStack.pop();
			
			return result;
		};
		lambda.string = output(tail[1]);
		return lambda;
	};
	
	// built in symbols
	symbols = { };
	symbols['do'] = function () {
		if (arguments.length < 1) {
			throw '\'do\' requires at least one argument';
		}
		return arguments[arguments.length - 1];
	};
	symbols['eval'] = function () {
		var i, expression, lastResult;
		
		for (i = 0; i < arguments.length; i++) {
			expression = arguments[i];
			if (typeof expression !== 'string') {
				throw '\'eval\' only accepts string parameters';
			}
			if (expression.length < 3) {
				throw '\'eval\' requires an expression as a parameter';
			}
			expression = expression.substring(1, expression.length - 1);
			lastResult = evaluate(macroExpand(parse(lex(expression))));
		}
		return lastResult[lastResult.length - 1];
	};
	
	symbols['head'] = function () {
		if (arguments.length !== 1 || !Array.isArray(arguments[0])) {
			throw 'head requires one list as an argument';
		}
		return arguments[0][0];
	};
	symbols['tail'] = function () {
		if (arguments.length !== 1 || !Array.isArray(arguments[0])) {
			throw 'tail requires one list as an argument';
		}
		return arguments[0].slice(1);
	};
	symbols['last'] = function () {
		if (arguments.length !== 1 || !Array.isArray(arguments[0])) {
			throw 'last requires one list as an argument';
		}
		return arguments[0][arguments[0].length - 1];
	};
	symbols['front'] = function () {
		if (arguments.length !== 1 || !Array.isArray(arguments[0])) {
			throw 'head requires one list as an argument';
		}
		return arguments[0].slice(0, arguments[0].length - 1);
	};
	
	symbols['+'] = function () {
		if (arguments.length < 2) {
			throw '\'+\' requires at least two arguments.'; 
		}
		
		// work for strings or numbers...
		if (typeof arguments[0] === 'string') {
			return '"' + foldLeft(arguments, '', function (a, b) { return a + b.substring(1, b.length - 1); }) + '"';
		}
		return foldLeft(arguments, 0, function (a, b) { return a + b; });
	};
	symbols['-'] = function () {
		if (arguments.length < 2) {
			throw '\'-\' requires exactly two arguments.'; 
		}
		return arguments[0] - arguments[1];
	};
	symbols['*'] = function () {
		if (arguments.length < 2) {
			throw '\'*\' requires at least two arguments.'; 
		}
		return foldLeft(arguments, 1, function (a, b) { return a * b; });
	};
	symbols['/'] = function () {
		if (arguments.length < 2) {
			throw '\'/\' requires exactly two arguments.'; 
		}
		return arguments[0] / arguments[1];
	};
	
	// TODO: allow comparison functions to accept multiple args
	symbols['='] = function () {
		if (arguments.length !== 2) {
			throw '\'=\' requires exactly two arguments';
		}
		return arguments[0] === arguments[1];
	};
	symbols['>'] = function () {
		if (arguments.length !== 2) {
			throw '\'>\' requires exactly two arguments';
		}
		return arguments[0] > arguments[1];
	};
	symbols['<'] = function () {
		if (arguments.length !== 2) {
			throw '\'<\' requires exactly two arguments';
		}
		return arguments[0] < arguments[1];
	};
	symbols['>='] = function () {
		if (arguments.length !== 2) {
			throw '\'>=\' requires exactly two arguments';
		}
		return arguments[0] >= arguments[1];
	};
	symbols['<='] = function () {
		if (arguments.length !== 2) {
			throw '\'<=\' requires exactly two arguments';
		}
		return arguments[0] <= arguments[1];
	};
	
	// TODO: allow logic functions to accept multiple args
	symbols['or'] = function () {
		if (arguments.length !== 2) {
			throw '\'<=\' requires exactly two arguments';
		}
		return arguments[0] || arguments[1];
	};
	symbols['and'] = function () {
		if (arguments.length !== 2) {
			throw '\'<=\' requires exactly two arguments';
		}
		return arguments[0] && arguments[1];
	};
	
	// input: string of lisp code
	// output: list of tokens
	function lex(source) {
		var tokens = [],
			STATE = {
				NORMAL: 0,
				DOUBLE_QUOTE_STRING: 1,
				SINGLE_QUOTE_STRING: 2
			},
			whitespace = /^\s$/i,
			currentToken = '',
			currentState = STATE.NORMAL,
			currentIndex, currentChar;
		
		if (typeof source !== 'string') {
			throw 'input must be of type string';
		}
		
		for (currentIndex = 0; currentIndex < source.length; currentIndex++) {
			currentChar = source[currentIndex];
			
			switch(currentState) {
				
				case STATE.NORMAL:
				
					if (currentChar === '(' || currentChar === ')') {
						if (currentToken !== '') {
							tokens.push(currentToken);
						}
						tokens.push(currentChar);
						currentToken = '';
						continue;
					}
					
					if (whitespace.test(currentChar)) {
						if (currentToken !== '') {
							tokens.push(currentToken);
							currentToken = '';
						}
						continue;
					}
					
					if (currentChar === '"') {
						currentState = STATE.DOUBLE_QUOTE_STRING;
					}
					else if (currentChar === "'") {
						currentState = STATE.SINGLE_QUOTE_STRING;
					}
					currentToken += currentChar;
					break;
			
				
				case STATE.DOUBLE_QUOTE_STRING:
					currentToken += currentChar;
					if (currentChar === '"' && currentToken.length > 0 && currentToken[currentToken.length - 1] !== '\\') {
						tokens.push(currentToken);
						currentToken = '';
						currentState = STATE.NORMAL;
					}
					break;
				
				case STATE.SINGLE_QUOTE_STRING:
					currentToken += currentChar;
					if (currentChar === "'" && currentToken.length > 0 && currentToken[currentToken.length - 1] !== '\\') {
						tokens.push(currentToken);
						currentToken = '';
						currentState = STATE.NORMAL;
					}
					break;
			}
		}
		
		if (currentToken !== '') {
			tokens.push(currentToken);
		}
		
		return tokens;
	};
 
 
	// input: list of tokens
	// output: syntax tree
	// errors: thrown on syntax violations
	function parse(tokens) {
		
		var expressions = [],
			expressionStack = [],
			currentExpression = null, 
			tokenIndex, currentToken, prevExpression;
		
		if (!Array.isArray(tokens)) {
			throw 'input must be an array of tokens';
		}
		
		for (tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
			currentToken = tokens[tokenIndex];
			
			if (currentExpression === null) {
				if (currentToken === ')') {
					throw 'Illegal \')\' encountered';
				}
				if (currentToken !== '(') {
					expressions.push(currentToken);
					continue;
				}
				// else, currentToken === '('
				currentExpression = [];
				continue;
			}
			
			// expression already being built
			if (currentToken === '(') {
				expressionStack.push(currentExpression);
				currentExpression = [];
				continue;
			}
			
			if (currentToken === ')') {
				if (expressionStack.length === 0) {
					expressions.push(currentExpression);
					currentExpression = null;
					continue;
				}
				
				prevExpression = expressionStack.pop();
				prevExpression.push(currentExpression);
				currentExpression = prevExpression;
				prevExpression = null;
				continue;
			}
			
			// else, regular token...
			currentExpression.push(currentToken);
		}
		
		if (expressionStack.length !== 0 || currentExpression !== null) {
			throw 'Missing \')\'';
		}
		
		return expressions;
	};
	
	
	// input: syntax tree
	// output: syntax tree w/ macros expanded
	function macroExpand(syntaxTree) {
		var i;
		
		for (i = 0; i < syntaxTree.length; i++) {
			if (Array.isArray(syntaxTree[i])) {
				syntaxTree[i] = macroExpand(syntaxTree[i]);
			}
		}
		
		if (syntaxTree.length > 0 && typeof macros[syntaxTree[0]] === 'function') {
			return macros[syntaxTree[0]](syntaxTree.splice(1));
		}
		return syntaxTree;
	};
	
	
	function isFunction (token) {
		// macros generated functions:
		if (typeof token === 'function') {
			return true;
		}
		
		// regular lisp functions:
		if (typeof symbols[token] === 'function') {
			return true;
		}
		
		// DOM/JS functions
		// TODO: alternative to this to access DOM API
		try {
			if (typeof eval(token) === 'function') {
				return true;
			}
		}
		catch (e) {
			return false;
		}
		return false;
	}
	
	function applyFunction (token, args) {
		// macro generated function
		if (typeof token === 'function') {
			return token.apply(null, args);
		}
		
		// lisp function: 
		if (typeof symbols[token] === 'function') {
			return symbols[token].apply(null, args);
		}
		
		/// 'native' function
		// TODO: fix 'this' scoping, dont use eval if possible... native function translation
		return eval(token+'.apply(null, args)');
	}
	
	function isLispNumber(val) {
		if (!isNaN(Number(val))) {
			return true;
		}
		return false;
	}
	
	function isLispString(val) {
		var first, last;
		
		if (typeof val !== 'string') {
			return false;
		}
		
		first = val.substring(0, 1);
		last = val.substring(val.length - 1);
		
		if (first === '"' && last === '"') {
			return true;
		}
		if (first === "'" && last === "'") {
			return true;
		}
		
		return false;
	}
	
	function isLispBool(val) {
		return val === 'true' || val === 'false';
	}
	function toLispBool(val) {
		return val === 'true';
	}
	
	
	// input: parsed syntax tree of the source code
	// output: list of evaluated expressions
	// strategy: look at first element in each list.  if a function, evaluate sub-pieces, then evaluate whole
	function evaluate (syntaxTree) {
		var index = 0,
			num, symbolType, wasFunction;
		
		if (!Array.isArray(syntaxTree)) {
			// check primitives, scopeStack, then symbol table
			var i;
			
			// number, string, or variable
			if (isLispNumber(syntaxTree)) {
				return Number(syntaxTree);
			}
			
			if (isLispBool(syntaxTree)) {
				return toLispBool(syntaxTree);
			}
			
			if (isLispString(syntaxTree) || isFunction(syntaxTree)) {
				return syntaxTree;
			}
			
			for (i = scopeStack.length - 1; i >= 0; i++) {
				if (typeof scopeStack[i][syntaxTree] !== 'undefined') {
					return scopeStack[i][syntaxTree];
				}
			}
			
			if (!symbols[syntaxTree]) {
				throw 'Unable to evaluate \'' + syntaxTree + '\'';
			}	
			
			symbolType = typeof symbols[syntaxTree];
			if (symbolType === 'function') {
				return 'lambda object';
			}
			if (Array.isArray(symbols[syntaxTree]) || symbolType !== 'object') {
				return symbols[syntaxTree];
			}
			
			throw 'Unable to evaluate...';
		}
		
		if (syntaxTree.length === 0) {
			return syntaxTree;
		}
		
		wasFunction = isFunction(syntaxTree[0]);
		if (wasFunction) {
			index = 1;
		}
		
		for (index; index < syntaxTree.length; index++) {
			syntaxTree[index] = evaluate(syntaxTree[index]);
		}
		
		if (wasFunction) {
			return applyFunction(syntaxTree[0], syntaxTree.slice(1));
		}
		return syntaxTree;
	};
	
	
	// input: a JS list
	// output: a Lisp formatted list.
	function output (val) {
		var result = '', i;
		
		if (typeof val === 'function') {
			if (typeof val.string !== 'undefined') {
				return val.string;
			}
			return '#lambda';
		}
		if (!Array.isArray(val)) {
			return val.toString();
		}
		
		result = '('; 
		for (i = 0; i < val.length; i++) {
			result += output(val[i]);
			if (i !== val.length - 1) {
				result += ' ';
			}
		}
		
		result += ')';
		return result;
	};
	
	
	
	// Public interface: 
	
	// input: some lisp code
	// output: the result of the last expression in the code
	lispx.execute = function (input) {
		var lexed, parsed, expanded, evaluated, display;
		
		try {
			lexed = lex(input);
		}
		catch (e) {
			return 'Lex Error: ' + e;
		}
		
		try {
			parsed = parse(lexed);
		} 
		catch (e) {
			return 'Parse Error: ' + e;
		}
		
		try {
			expanded = macroExpand(parsed);
		}
		catch (e) {
			return 'Macro Expansion Error: ' + e;
		}
		
		try {
			evaluated = evaluate(expanded);
		}
		catch (e) {
			return 'Evaluation Error: ' + e;
		}
		
		try {
			display = output(evaluated[evaluated.length - 1]);
		}
		catch (e) {
			return 'Output Error: ' + e;
		}
		
		return display;
	};
	
	window.LISPX = lispx;
	
 }