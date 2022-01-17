function(match, stack){
		if (this.ast) { //#ifdef FULL_AST
			stack.push(stack = []);
			stack.desc = 'statement';
			stack.sub = 'switch';
			stack.nextBlack = match.tokposb;

			this.statementLabels.push(''); // add "empty"
		} //#endif
		// meh.
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		if (match.value != '(') match = this.failsafe('ExpectedStatementHeaderOpen', match);
		if (this.ast) { //#ifdef FULL_AST
			var lhp = match;
			match.statementHeaderStart = true;
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
		if (!(/*is left hand side start?*/ match.name <= 6 || match.name == 15/*TAG*/ || this.regexLhsStart.test(match.value))) {
			this.failignore('StatementHeaderIsNotOptional', match, stack);
		}
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
		if (match.value != '{') match = this.failsafe('SwitchBodyStartsWithCurly', match);

		if (this.ast) { //#ifdef FULL_AST
			var lhc = match;
		} //#endif
		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

		// you may parse a default case, and only once per switch. but you may do so anywhere.
		var parsedAnything = false;

		while (match.value == 'case' || (!stack.parsedSwitchDefault && match.value == 'default')) {
			parsedAnything = true;
			if (match.value == 'default') stack.parsedSwitchDefault = true;

			match = this.eatSwitchClause(match, stack);
		}

		// if you didnt parse anything but not encountering a closing curly now, you might be thinking that switches may start with silly stuff
		if (!parsedAnything && match.value != '}') {
			match = this.failsafe('SwitchBodyMustStartWithClause', match);
		}

		if (stack.parsedSwitchDefault && match.value == 'default') {
			this.failignore('SwitchCannotHaveDoubleDefault', match, stack);
		}

		if (match.value != '}' && match.name != 14/*error*/) match = this.failsafe('SwitchBodyEndsWithCurly', match);

		if (this.ast) { //#ifdef FULL_AST
			match.twin = lhc;
			lhc.twin = match;
		}		match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

		return match;
	},
