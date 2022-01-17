function(match, stack){
		if (this.ast) { //#ifdef FULL_AST
			stack.push(stack = []);
			stack.desc = 'statement';
			stack.sub = 'for';
			stack.isIteration = true;
			stack.nextBlack = match.tokposb;
			this.statementLabels.push(''); // add "empty"
		} //#endif
		// either a for(..in..) or for(..;..;..)
		// start eating an expression but refuse to parse
		// 'in' on the top-level of that expression. they are fine
		// in sub-levels (group, array, etc). Now the expression
		// must be followed by either ';' or 'in'. Else throw.
		// Branch on that case, ; requires two.
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		if (match.value != '(') match = this.failsafe('ExpectedStatementHeaderOpen', match);
		if (this.ast) { //#ifdef FULL_AST
			var lhp = match;
			match.statementHeaderStart = true;
			match.forHeaderStart = true;
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

		// for (either case) may start with var, in which case you'll parse a var declaration before encountering the 'in' or first semi.
		if (match.value == 'var') {
			match = this.eatVarDecl(match, stack, true);
		} else if (match.value != ';') { // expressions are optional in for-each
			if (!(/*is left hand side start?*/ match.name <= 6 || match.name == 15/*TAG*/ || this.regexLhsStart.test(match.value))) {
				this.failignore('StatementHeaderIsNotOptional', match, stack);
			}
			match = this.eatExpressions(false, match, stack, false, true); // can parse multiple expressions, in is not ok here
		}

		// now we parsed an expression if it existed. the next token should be either ';' or 'in'. branch accordingly
		if (match.value == 'in') {
			var declStack = stack[stack.length-1];
			if (declStack.varsDeclared > 1) {
				// disallowed. for-in var decls can only have one var name declared
				this.failignore('ForInCanOnlyDeclareOnVar', match, stack);
			}
			
			if (this.ast) { //#ifdef FULL_AST
				stack.forType = 'in';
				match.forFor = true; // make easy distinction between conditional and iterational operator
			} //#endif

			// just parse another expression, where 'in' is allowed.
			match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
			match = this.eatExpressions(false, match, stack);
		} else {
			if (match.value != ';') match = this.failsafe('ForHeaderShouldHaveSemisOrIn', match);

			if (this.ast) { //#ifdef FULL_AST
				stack.forType = 'each';
				match.forEachHeaderStart = true;
			} //#endif
			// parse another optional no-in expression, another semi and then one more optional no-in expression
			match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
			if (/*is left hand side start?*/ match.name <= 6 || match.name == 15/*TAG*/ || this.regexLhsStart.test(match.value)) match = this.eatExpressions(false, match, stack); // in is ok here
			if (match.value != ';') match = this.failsafe('ExpectedSecondSemiOfForHeader', match);
			if (this.ast) { //#ifdef FULL_AST
				match.forEachHeaderStop = true;
			} //#endif
			match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
			if (/*is left hand side start?*/ match.name <= 6 || match.name == 15/*TAG*/ || this.regexLhsStart.test(match.value)) match = this.eatExpressions(false, match, stack); // in is ok here
		}

		if (match.value != ')') match = this.failsafe('ExpectedStatementHeaderClose', match);
		if (this.ast) { //#ifdef FULL_AST
			match.twin = lhp;
			match.statementHeaderStop = true;
			match.forHeaderStop = true;
			lhp.twin = match;

			if (match.forType == 'in' && stack[stack.length-1].desc == 'expressions') {
				// create ref to this expression group to the opening bracket
				lhp.expressionArg = stack[stack.length-1];
			}
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

		match = this.eatStatement(false, match, stack);

		return match;
	}