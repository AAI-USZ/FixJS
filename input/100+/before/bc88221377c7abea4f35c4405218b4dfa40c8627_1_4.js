function(match, stack){
		if (this.ast) { //#ifdef FULL_AST
			stack.push(stack = []);
			stack.desc = 'statement';
			stack.sub = 'do';
			stack.isIteration = true;
			stack.nextBlack = match.tokposb;
			this.statementLabels.push(''); // add "empty"
			var doToken = match;
		} //#endif
		// statement
		// while
		// (
		// expression
		// )
		// semi-colon
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		match = this.eatStatement(false, match, stack);
		if (match.value != 'while') match = this.failsafe('DoShouldBeFollowedByWhile', match);
		if (this.ast) { //#ifdef FULL_AST
			match.hasDo = doToken;
		} //#endif
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
			match.isForDoWhile = true; // prevents missing block warnings
			lhp.twin = match;

			if (stack[stack.length-1].desc == 'expressions') {
				// create ref to this expression group to the opening bracket
				lhp.expressionArg = stack[stack.length-1];
			}
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		match = this.eatSemiColon(match, stack); // TOFIX: this is not optional according to the spec, but browsers apply ASI anyways

		return match;
	}