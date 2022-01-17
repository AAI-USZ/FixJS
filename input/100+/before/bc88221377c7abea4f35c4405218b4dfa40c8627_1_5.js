function(match, stack){
		if (this.ast) { //#ifdef FULL_AST
			stack.push(stack = []);
			stack.desc = 'statement';
			stack.sub = 'while';
			stack.isIteration = true;
			stack.nextBlack = match.tokposb;
			this.statementLabels.push(''); // add "empty"
		} //#endif

		// (
		// expression
		// )
		// statement
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		if (match.value != '(') match = this.failsafe('ExpectedStatementHeaderOpen', match);
		if (this.ast) { //#ifdef FULL_AST
			var lhp = match;
			match.statementHeaderStart = true;
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) match = this.failsafe('StatementHeaderIsNotOptional', match);
		match = this.eatExpressions(false, match, stack);
		if (match.value != ')') match = this.failsafe('ExpectedStatementHeaderClose', match);
		if (this.ast) { //#ifdef FULL_AST
			match.twin = lhp;
			match.statementHeaderStop = true;
			lhp.twin = match;

			if (stack[stack.length-1].desc == 'expressions') {
				// create ref to this expression group to the opening bracket
				lhp.expressionArg = stack[stack.length-1];
			}
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		match = this.eatStatement(false, match, stack);

		return match;
	}