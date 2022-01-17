function(match, stack, forHeader){
		// assumes match is indeed the identifier 'var'
		if (this.ast) { //#ifdef FULL_AST
			stack.push(stack = []);
			stack.desc = 'var decl';
			stack.nextBlack = match.tokposb;

			var targetScope = this.scope;
			while (targetScope.catchScope) targetScope = targetScope[0];
		} //#endif
		var first = true;
		var varsDeclared = 0;
		do {
			++varsDeclared;
			match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack); // start: var, iteration: comma
			if (this.ast) { //#ifdef FULL_AST
				var declStack = stack;
				var stack = [];
				stack.desc = 'single var decl';
				stack.varStack = declStack; // reference to the var statement stack, it might hook to jsdoc needed for these vars
				stack.nextBlack = match.tokposb;
				declStack.push(stack);

				var singleDecStack = stack;
				stack = [];
				stack.desc = 'sub-expression';
				stack.nextBlack = match.tokposb;
				singleDecStack.push(stack);
			} //#endif

			// next token should be a valid identifier
			if (match.name == 12/*eof*/) {
				if (first) match = this.failsafe('VarKeywordMissingName', match);
				// else, ignore. TOFIX: return?
				else match = this.failsafe('IllegalTrailingComma', match);
			} else if (match.name != 2/*IDENTIFIER*/) {
				match = this.failsafe('VarNamesMayOnlyBeIdentifiers', match);
			} else if (this.hashStartKeyOrReserved[match.value[0]] /*this.regexStartKeyOrReserved.test(match.value[0])*/ && this.regexIsKeywordOrReserved.test(match.value)) {
				match = this.failsafe('VarNamesCanNotBeReserved', match);
			}
			// mark the match as being a variable name. we need it for lookup later :)
			if (this.ast) { //#ifdef FULL_AST
				match.meta = 'var name';
				targetScope.push({value:match.value});
			} //#endif
			match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

			if (this.ast) { //#ifdef FULL_AST
				stack = singleDecStack;
			} //#endif

			// next token should either be a = , or ;
			// if = parse an expression and optionally a comma
			if (match.value == '=') {
				if (this.ast) { //#ifdef FULL_AST
					singleDecStack = stack;
					stack = [];
					stack.desc = 'operator-expression';
					stack.sub = '=';
					stack.nextBlack = match.tokposb;
					singleDecStack.push(stack);

					stack.isAssignment = true;
				} //#endif
				match.isInitialiser = true;
				match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
				if (this.ast) { //#ifdef FULL_AST
					stack = singleDecStack;
				} //#endif

				if (!(/*is left hand side start?*/ match.name <= 6 || match.name == 15/*TAG*/ || match.name == 14/*error*/ || this.regexLhsStart.test(match.value))) match = this.failsafe('VarInitialiserExpressionExpected', match);
				match = this.eatExpressions(false, match, stack, true, forHeader); // only one expression 
				// var statement: comma or semi now
				// for statement: semi, comma or 'in'
			}
			if (this.ast) { //#ifdef FULL_AST
				stack = declStack;
			} //#endif

			// determines proper error message in one case
			first = false;
		// keep parsing name(=expression) sequences as long as you see a comma here
		} while (match.value == ',');

		if (this.ast) { //#ifdef FULL_AST
			stack.varsDeclared = varsDeclared;
		} //#endif

		return match;
	}