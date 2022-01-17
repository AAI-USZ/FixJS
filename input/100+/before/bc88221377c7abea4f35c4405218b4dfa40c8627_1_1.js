function(mayParseLabeledStatementInstead, match, stack, onlyOne, forHeader, isBreakOrContinueArg){
		if (this.ast) { //#ifdef FULL_AST
			var pstack = stack;
			stack = [];
			stack.desc = 'expressions';
			stack.nextBlack = match.tokposb;
			pstack.push(stack);

			var parsedExpressions = 0;
		} //#endif

		var first = true;
		do {
			var parsedNonAssignmentOperator = false; // once we parse a non-assignment, this expression can no longer parse an assignment
			// TOFIX: can probably get the regex out somehow...
			if (!first) {
				match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
				if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) match = this.failsafe('ExpectedAnotherExpressionComma', match);
			}

			if (this.ast) { //#ifdef FULL_AST
				++parsedExpressions;

				var astack = stack;
				stack = [];
				stack.desc = 'expression';
				stack.nextBlack = match.tokposb;
				astack.push(stack);
			} //#endif

			// start of expression is given: match
			// it should indeed be a properly allowed lhs
			// first eat all unary operators
			// they can be added to the stack, but we need to ensure they have indeed a valid operator

			var parseAnotherExpression = true;
			while (parseAnotherExpression) { // keep parsing lhs+operator as long as there is an operator after the lhs.
				if (this.ast) { //#ifdef FULL_AST
					var estack = stack;
					stack = [];
					stack.desc = 'sub-expression';
					stack.nextBlack = match.tokposb;
					estack.push(stack);

					var news = 0; // encountered new operators waiting for parenthesis
				} //#endif

				// start checking lhs
				// if lhs is identifier (new/call expression), allow to parse an assignment operator next
				// otherwise keep eating unary expressions and then any "value"
				// after that search for a binary operator. if we only ate a new/call expression then
				// also allow to eat assignments. repeat for the rhs.
				var parsedUnaryOperator = false;
				var isUnary = null;
				while (
					!isBreakOrContinueArg && // no unary for break/continue
					(isUnary =
						(match.value && this.hashUnaryKeywordStart[match.value[0]] && this.regexUnaryKeywords.test(match.value)) || // (match.value == 'delete' || match.value == 'void' || match.value == 'typeof' || match.value == 'new') ||
						(match.name == 11/*PUNCTUATOR*/ && this.regexUnaryOperators.test(match.value))
					)
				) {
					if (isUnary) match.isUnaryOp = true;
					if (this.ast) { //#ifdef FULL_AST
						// find parenthesis
						if (match.value == 'new') ++news;
					} //#endif

					match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					// ensure that it is in fact a valid lhs-start
					if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) match = this.failsafe('ExpectedAnotherExpressionRhs', match);
					// not allowed to parse assignment
					parsedUnaryOperator = true;
				};

				// if we parsed any kind of unary operator, we cannot be parsing a labeled statement
				if (parsedUnaryOperator) mayParseLabeledStatementInstead = false;

				// so now we know match is a valid lhs-start and not a unary operator
				// it must be a string, number, regex, identifier 
				// or the start of an object literal ({), array literal ([) or group operator (().

				var acceptAssignment = false;

				// take care of the "open" cases first (group, array, object)
				if (match.value == '(') {
					if (this.ast) { //#ifdef FULL_AST
						var groupStack = stack;
						stack = [];
						stack.desc = 'grouped';
						stack.nextBlack = match.tokposb;
						groupStack.push(stack);

						var lhp = match;

						match.isGroupStart = true;
					} //#endif
					match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) match = this.failsafe('GroupingShouldStartWithExpression', match);
					// keep parsing expressions as long as they are followed by a comma
					match = this.eatExpressions(false, match, stack);

					if (match.value != ')') match = this.failsafe('UnclosedGroupingOperator', match);
					if (this.ast) { //#ifdef FULL_AST
						match.twin = lhp;
						lhp.twin = match;

						match.isGroupStop = true;

						if (stack[stack.length-1].desc == 'expressions') {
							// create ref to this expression group to the opening paren
							lhp.expressionArg = stack[stack.length-1];
						}
					} //#endif
					match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // might be div

					if (this.ast) { //#ifdef FULL_AST
						stack = groupStack;
					} //#endif
					// you can assign to group results. and as long as the group does not contain a comma (and valid ref), it will work too :)
					acceptAssignment = true;
				// there's an extra rule for [ namely that, it must start with an expression but after that, expressions are optional
				} else if (match.value == '[') {
					if (this.ast) { //#ifdef FULL_AST
						stack.sub = 'array literal';
						stack.hasArrayLiteral = true;
						var lhsb = match;

						match.isArrayLiteralStart = true;

						if (!this.scope.arrays) this.scope.arrays = [];
						match.arrayId = this.scope.arrays.length;
						this.scope.arrays.push(match);

						match.targetScope = this.scope;
					} //#endif
					// keep parsing expressions as long as they are followed by a comma
					match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

					// arrays may start with "elided" commas
					while (match.value == ',') match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

					var foundAtLeastOneComma = true; // for entry in while
					while (foundAtLeastOneComma && match.value != ']') {
						foundAtLeastOneComma = false;

						if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value)) && match.name != 14/*error*/) match = this.failsafe('ArrayShouldStartWithExpression', match);
						match = this.eatExpressions(false, match, stack, true);

						while (match.value == ',') {
							foundAtLeastOneComma = true;
							match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
						}
					}
					if (match.value != ']') {
						match = this.failsafe('UnclosedPropertyBracket', match);
					}
					if (this.ast) { //#ifdef FULL_AST
						match.twin = lhsb;
						lhsb.twin = match;

						match.isArrayLiteralStop = true;
					} //#endif
					match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // might be div
					while (match.value == '++' || match.value == '--') {
						// gobble and ignore?
						this.failignore('InvalidPostfixOperandArray', match, stack);
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					}
				// object literals need seperate handling...
				} else if (match.value == '{') {
					if (this.ast) { //#ifdef FULL_AST
						stack.sub = 'object literal';
						stack.hasObjectLiteral = true;

						match.isObjectLiteralStart = true;

						if (!this.scope.objects) this.scope.objects = [];
						match.objectId = this.scope.objects.length;
						this.scope.objects.push(match);

						var targetObject = match;
						match.targetScope = this.scope;
	
						var lhc = match;
					} //#endif

					match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					if (match.name == 12/*eof*/) {
						match = this.failsafe('ObjectLiteralExpectsColonAfterName', match);
					}
					// ObjectLiteral
					// PropertyNameAndValueList

					while (match.value != '}' && match.name != 14/*error*/) { // will stop if next token is } or throw if not and no comma is found
						// expecting a string, number, or identifier
						//if (match.name != 5/*STRING_SINGLE*/ && match.name != 6/*STRING_DOUBLE*/ && match.name != 3/*NUMERIC_HEX*/ && match.name != 4/*NUMERIC_DEC*/ && match.name != 2/*IDENTIFIER*/) {
						// TOFIX: more specific errors depending on type...
						if (!match.isNumber && !match.isString && match.name != 2/*IDENTIFIER*/) {
							match = this.failsafe('IllegalPropertyNameToken', match);
						}

						if (this.ast) { //#ifdef FULL_AST
							var objLitStack = stack;
							stack = [];
							stack.desc = 'objlit pair';
							stack.isObjectLiteralPair = true;
							stack.nextBlack = match.tokposb;
							objLitStack.push(stack);

							var propNameStack = stack;
							stack = [];
							stack.desc = 'objlit pair name';
							stack.nextBlack = match.tokposb;
							propNameStack.push(stack);

							propNameStack.sub = 'data';

							var propName = match;
							propName.isPropertyName = true;
						} //#endif

						var getset = match.value;
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
						if (this.ast) { //#ifdef FULL_AST
							stack = propNameStack;
						} //#endif
						
						// for get/set we parse a function-like definition. but only if it's immediately followed by an identifier (otherwise it'll just be the property 'get' or 'set')
						if (getset == 'get') {
							// "get" PropertyName "(" ")" "{" FunctionBody "}"
							if (match.value == ':') {
								if (this.ast) { //#ifdef FULL_AST
									propName.isPropertyOf = targetObject;
								} //#endif
								match = this.eatObjectLiteralColonAndBody(match, stack);
							} else {
								if (this.ast) { //#ifdef FULL_AST
									match.isPropertyOf = targetObject;
									propNameStack.sub = 'getter';
									propNameStack.isAccessor = true;
								} //#endif
								// if (match.name != 2/*IDENTIFIER*/ && match.name != 5/*STRING_SINGLE*/ && match.name != 6/*STRING_DOUBLE*/ && match.name != 3/*NUMERIC_HEX*/ && match.name != 4/*NUMERIC_DEC*/) {
								if (!match.isNumber && !match.isString && match.name != 2/*IDENTIFIER*/) match = this.failsafe('IllegalGetterSetterNameToken', match, true);
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								if (match.value != '(') match = this.failsafe('GetterSetterNameFollowedByOpenParen', match);
								if (this.ast) { //#ifdef FULL_AST
									var lhp = match;
								} //#endif
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								if (match.value != ')') match = this.failsafe('GetterHasNoArguments', match);
								if (this.ast) { //#ifdef FULL_AST
									match.twin = lhp;
									lhp.twin = match;
								} //#endif
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								match = this.eatFunctionBody(match, stack);
							}
						} else if (getset == 'set') {
							// "set" PropertyName "(" PropertySetParameterList ")" "{" FunctionBody "}"
							if (match.value == ':') {
								if (this.ast) { //#ifdef FULL_AST
									propName.isPropertyOf = targetObject;
								} //#endif
								match = this.eatObjectLiteralColonAndBody(match, stack);
							} else {
								if (this.ast) { //#ifdef FULL_AST
									match.isPropertyOf = targetObject;
									propNameStack.sub = 'setter';
									propNameStack.isAccessor = true;
								} //#endif
								if (!match.isNumber && !match.isString && match.name != 2/*IDENTIFIER*/) match = this.failsafe('IllegalGetterSetterNameToken', match);
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								if (match.value != '(') match = this.failsafe('GetterSetterNameFollowedByOpenParen', match);
								if (this.ast) { //#ifdef FULL_AST
									var lhp = match;
								} //#endif
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								if (match.name != 2/*IDENTIFIER*/) {
									if (match.value == ')') match = this.failsafe('SettersMustHaveArgument', match);
									else match = this.failsafe('IllegalSetterArgumentNameToken', match);
								}
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								if (match.value != ')') {
									if (match.value == ',') match = this.failsafe('SettersOnlyGetOneArgument', match);
									else match = this.failsafe('SetterHeaderShouldHaveClosingParen', match);
								}
								if (this.ast) { //#ifdef FULL_AST
									match.twin = lhp;
									lhp.twin = match;
								} //#endif
								match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
								match = this.eatFunctionBody(match, stack);
							}
						} else {
							// PropertyName ":" AssignmentExpression
							if (this.ast) { //#ifdef FULL_AST
								propName.isPropertyOf = targetObject;
							} //#endif
							match = this.eatObjectLiteralColonAndBody(match, stack);
						}

						if (this.ast) { //#ifdef FULL_AST
							stack = objLitStack;
						} //#endif

						// one trailing comma allowed
						if (match.value == ',') {
							match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
							if (match.value == ',') match = this.failsafe('IllegalDoubleCommaInObjectLiteral', match);
						} else if (match.value != '}') match = this.failsafe('UnclosedObjectLiteral', match);

						// either the next token is } and the loop breaks or
						// the next token is the start of the next PropertyAssignment...
					}
					// closing curly
					if (this.ast) { //#ifdef FULL_AST
						match.twin = lhc;
						lhc.twin = match;

						match.isObjectLiteralStop = true;
					} //#endif

					match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // next may be div
					while (match.value == '++' || match.value == '--') {
						this.failignore('InvalidPostfixOperandObject', match, stack);
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					}
				} else if (match.value == 'function') { // function expression
					if (this.ast) { //#ifdef FULL_AST
						var oldstack = stack;
						stack = [];
						stack.desc = 'func expr';
						stack.isFunction = true;
						stack.nextBlack = match.tokposb;
						if (!this.scope.functions) this.scope.functions = [];
						match.functionId = this.scope.functions.length;
						this.scope.functions.push(match);
						oldstack.push(stack);
						var oldscope = this.scope;
						// add new scope
						match.scope = stack.scope = this.scope = [
							this.scope,
							{value:'this', isDeclared:true, isEcma:true, functionStack: stack},
							{value:'arguments', isDeclared:true, isEcma:true, varType:['Object']}
						]; // add the current scope (to build chain up-down)
						this.scope.upper = oldscope;
						// ref to back to function that's the cause for this scope
						this.scope.scopeFor = match;
						match.targetScope = oldscope; // consistency
						match.isFuncExprKeyword = true;
						match.functionStack = stack;
					} //#endif
					var funcExprToken = match;

					match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					if (mayParseLabeledStatementInstead && match.value == ':') match = this.failsafe('LabelsMayNotBeReserved', match);
					if (match.name == 2/*IDENTIFIER*/) {
						funcExprToken.funcName = match;
						match.meta = "func expr name";
						match.varType = ['Function'];
						match.functionStack = stack; // ref to the stack, in case we detect the var being a constructor
						if (this.ast) { //#ifdef FULL_AST
							// name is only available to inner scope
							this.scope.push({value:match.value});
						} //#endif
						if (this.hashStartKeyOrReserved[match.value[0]] /*this.regexStartKeyOrReserved.test(match.value[0])*/ && this.regexIsKeywordOrReserved.test(match.value)) match = this.failsafe('FunctionNameMustNotBeReserved', match);
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					}
					match = this.eatFunctionParametersAndBody(match, stack, true, funcExprToken); // first token after func-expr is div

					while (match.value == '++' || match.value == '--') {
						this.failignore('InvalidPostfixOperandFunction', match, stack);
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					}

					if (this.ast) { //#ifdef FULL_AST
						// restore stack and scope
						stack = oldstack;
						this.scope = oldscope;
					} //#endif
				} else if (match.name <= 6) { // IDENTIFIER STRING_SINGLE STRING_DOUBLE NUMERIC_HEX NUMERIC_DEC REG_EX
					// save it in case it turns out to be a label.
					var possibleLabel = match;

					// validate the identifier, if any
					if (match.name == 2/*IDENTIFIER*/) {
						if (
							// this, null, true, false are actually allowed here
							!this.regexLiteralKeywords.test(match.value) &&
							// other reserved words are not
							this.hashStartKeyOrReserved[match.value[0]] /*this.regexStartKeyOrReserved.test(match.value[0])*/ && this.regexIsKeywordOrReserved.test(match.value)
						) {
							// if break/continue, we skipped the unary operator check so throw the proper error here
							if (isBreakOrContinueArg) {
								this.failignore('BreakOrContinueArgMustBeJustIdentifier', match, stack);
							} else if (match.value == 'else') {
								this.failignore('DidNotExpectElseHere', match, stack);
							} else {
								//if (mayParseLabeledStatementInstead) {new ZeParser.Error('LabelsMayNotBeReserved', match);
								// TOFIX: lookahead to see if colon is following. throw label error instead if that's the case
								// any forbidden keyword at this point is likely to be a statement start.
								// its likely that the parser will take a while to recover from this point...
								this.failignore('UnexpectedToken', match, stack);
								// TOFIX: maybe i should just return at this point. cut my losses and hope for the best.
							}
						}

						// only accept assignments after a member expression (identifier or ending with a [] suffix)
						acceptAssignment = true;
					} else if (isBreakOrContinueArg) match = this.failsafe('BreakOrContinueArgMustBeJustIdentifier', match);

					// the current match is the lead value being queried. tag it that way
					if (this.ast) { //#ifdef FULL_AST
						// dont mark labels
						if (!isBreakOrContinueArg) {
							match.meta = 'lead value';
							match.leadValue = true;
						}
					} //#endif


					// ok. gobble it.
					match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // division allowed

					// now check for labeled statement (if mayParseLabeledStatementInstead then the first token for this expression must be an (unreserved) identifier)
					if (mayParseLabeledStatementInstead && match.value == ':') {
						if (possibleLabel.name != 2/*IDENTIFIER*/) {
							// label was not an identifier
							// TOFIX: this colon might be a different type of error... more analysis required
							this.failignore('LabelsMayOnlyBeIdentifiers', match, stack);
						}

						mayParseLabeledStatementInstead = true; // mark label parsed (TOFIX:speed?)
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

						possibleLabel.isLabel = true;
						if (this.ast) { //#ifdef FULL_AST
							delete possibleLabel.meta; // oh oops, it's not a lead value.

							possibleLabel.isLabelDeclaration = true;
							this.statementLabels.push(possibleLabel.value);

							stack.desc = 'labeled statement';
						} //#endif

						var errorIdToReplace = this.errorStack.length;
						// eat another statement now, its the body of the labeled statement (like if and while)
						match = this.eatStatement(false, match, stack);

						// if no statement was found, check here now and correct error
						if (match.error && match.error.msg == ZeParser.Errors.UnableToParseStatement.msg) {
							// replace with better error...
							match.error = new ZeParser.Error('LabelRequiresStatement');
							// also replace on stack
							this.errorStack[errorIdToReplace] = match.error;
						}

						match.wasLabel = true;

						return match;
					}

					mayParseLabeledStatementInstead = false;
				} else if (match.value == '}') {
					// ignore... its certainly the end of this expression, but maybe asi can be applied...
					// it might also be an object literal expecting more, but that case has been covered else where.
					// if it turns out the } is bad after all, .parse() will try to recover
				} else if (match.name == 14/*error*/) {
					do {
						if (match.tokenError) {
							var pe = new ZeParser.Error('TokenizerError', match);
							pe.msg += ': '+match.error.msg;
							this.errorStack.push(pe);
							
							this.failSpecial({start:match.start,stop:match.start,name:14/*error*/,error:pe}, match, stack)
						}
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
					} while (match.name == 14/*error*/);
				} else if (match.name == 12/*eof*/) {
					// cant parse any further. you're probably just typing...
					return match;
				} else {
					//if (!this.errorStack.length && match.name != 12/*eof*/) console.log(["unknown token", match, stack, Gui.escape(this.input)]);
					this.failignore('UnknownToken', match, stack);
					// we cant really ignore this. eat the token and try again. possibly you're just typing?
					match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
				}

				// search for "value" suffix. property access and call parens.
				while (match.value == '.' || match.value == '[' || match.value == '(') {
					if (isBreakOrContinueArg) match = this.failsafe('BreakOrContinueArgMustBeJustIdentifier', match);

					if (match.value == '.') {
						// property access. read in an IdentifierName (no keyword checks). allow assignments
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
						if (match.name != 2/*IDENTIFIER*/) this.failignore('PropertyNamesMayOnlyBeIdentifiers', match, stack);
						if (this.ast) { //#ifdef FULL_AST
							match.isPropertyName = true;
						} //#endif
						match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // may parse div
						acceptAssignment = true;
					} else if (match.value == '[') {
						if (this.ast) { //#ifdef FULL_AST
							var lhsb = match;
							match.propertyAccessStart = true;
						} //#endif
						// property access, read expression list. allow assignments
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
						if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) {
							if (match.value == ']') match = this.failsafe('SquareBracketsMayNotBeEmpty', match);
							else match = this.failsafe('SquareBracketExpectsExpression', match);
						}
						match = this.eatExpressions(false, match, stack);
						if (match.value != ']') match = this.failsafe('UnclosedSquareBrackets', match);
						if (this.ast) { //#ifdef FULL_AST
							match.twin = lhsb;
							match.propertyAccessStop = true;
							lhsb.twin = match;

							if (stack[stack.length-1].desc == 'expressions') {
								// create ref to this expression group to the opening bracket
								lhsb.expressionArg = stack[stack.length-1];
							}
						} //#endif
						match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // might be div
						acceptAssignment = true;
					} else if (match.value == '(') {
						if (this.ast) { //#ifdef FULL_AST
							var lhp = match;
							match.isCallExpressionStart = true;
							if (news) {
								match.parensBelongToNew = true;
								--news;
							}
						} //#endif
						// call expression, eat optional expression list, disallow assignments
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
						if (/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value)) match = this.eatExpressions(false, match, stack); // arguments are optional
						if (match.value != ')') match = this.failsafe('UnclosedCallParens', match);
						if (this.ast) { //#ifdef FULL_AST
							match.twin = lhp;
							lhp.twin = match;
							match.isCallExpressionStop = true;

							if (stack[stack.length-1].desc == 'expressions') {
								// create ref to this expression group to the opening bracket
								lhp.expressionArg = stack[stack.length-1];
							}
						} //#endif
						match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // might be div
						acceptAssignment = false;
					}
				}

				// check for postfix operators ++ and --
				// they are stronger than the + or - binary operators
				// they can be applied to any lhs (even when it wouldnt make sense)
				// if there was a newline, it should get an ASI
				if ((match.value == '++' || match.value == '--') && !match.newline) {
					if (isBreakOrContinueArg) match = this.failsafe('BreakOrContinueArgMustBeJustIdentifier', match);
					match = this.tokenizer.storeCurrentAndFetchNextToken(true, match, stack); // may parse div
				}

				if (this.ast) { //#ifdef FULL_AST
					// restore "expression" stack
					stack = estack;
				} //#endif
				// now see if there is an operator following...

				do { // this do allows us to parse multiple ternary expressions in succession without screwing up.
					var ternary = false;
					if (
						(!forHeader && match.value == 'in') || // one of two named binary operators, may not be first expression in for-header (when semi's occur in the for-header)
						(match.value == 'instanceof') || // only other named binary operator
						((match.name == 11/*PUNCTUATOR*/) && // we can only expect a punctuator now
							(match.isAssignment = this.regexAssignments.test(match.value)) || // assignments are only okay with proper lhs
							this.regexNonAssignmentBinaryExpressionOperators.test(match.value) // test all other binary operators
						)
					) {
						if (match.isAssignment) {
							if (!acceptAssignment) this.failignore('IllegalLhsForAssignment', match, stack);
							else if (parsedNonAssignmentOperator) this.failignore('AssignmentNotAllowedAfterNonAssignmentInExpression', match, stack);
						}
						if (isBreakOrContinueArg) match = this.failsafe('BreakOrContinueArgMustBeJustIdentifier', match);

						if (!match.isAssignment) parsedNonAssignmentOperator = true; // last allowed assignment
						if (this.ast) { //#ifdef FULL_AST
							match.isBinaryOperator = true;
							// we build a stack to ensure any whitespace doesnt break the 1+(n*2) children rule for expressions
							var ostack = stack;
							stack = [];
							stack.desc = 'operator-expression';
							stack.isBinaryOperator = true;
							stack.sub = match.value;
							stack.nextBlack = match.tokposb;
							ostack.sub = match.value;
							stack.isAssignment = match.isAssignment;
							ostack.push(stack);
						} //#endif
						ternary = match.value == '?';
						// math, logic, assignment or in or instanceof
						match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);

						if (this.ast) { //#ifdef FULL_AST
							// restore "expression" stack
							stack = ostack;
						} //#endif

						// minor exception to ternary operator, we need to parse two expressions nao. leave the trailing expression to the loop.
						if (ternary) {
							// LogicalORExpression "?" AssignmentExpression ":" AssignmentExpression
							// so that means just one expression center and right.
							if (!(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) this.failignore('InvalidCenterTernaryExpression', match, stack);
							match = this.eatExpressions(false, match, stack, true, forHeader); // only one expression allowed inside ternary center/right

							if (match.value != ':') {
								if (match.value == ',') match = this.failsafe('TernarySecondExpressionCanNotContainComma', match);
								else match = this.failsafe('UnfinishedTernaryOperator', match);
							}
							if (this.ast) { //#ifdef FULL_AST
								// we build a stack to ensure any whitespace doesnt break the 1+(n*2) children rule for expressions
								var ostack = stack;
								stack = [];
								stack.desc = 'operator-expression';
								stack.sub = match.value;
								stack.nextBlack = match.tokposb;
								ostack.sub = match.value;
								stack.isAssignment = match.isAssignment;
								ostack.push(stack);
							} //#endif
							match = this.tokenizer.storeCurrentAndFetchNextToken(false, match, stack);
							if (this.ast) { //#ifdef FULL_AST
								stack = ostack;
							} //#endif
							// rhs of the ternary can not contain a comma either
							match = this.eatExpressions(false, match, stack, true, forHeader); // only one expression allowed inside ternary center/right
						}
					} else {
						parseAnotherExpression = false;
					}
				} while (ternary); // if we just parsed a ternary expression, we need to check _again_ whether the next token is a binary operator.

				// start over. match is the rhs for the lhs we just parsed, but lhs for the next expression
				if (parseAnotherExpression && !(/*is left hand side start?*/ match.name <= 6 || this.regexLhsStart.test(match.value))) {
					// no idea what to do now. lets just ignore and see where it ends. TOFIX: maybe just break the loop or return?
					this.failignore('InvalidRhsExpression', match, stack);
				}
			}

			if (this.ast) { //#ifdef FULL_AST
				// restore "expressions" stack
				stack = astack;
			} //#endif

			// at this point we should have parsed one AssignmentExpression
			// lets see if we can parse another one...
			mayParseLabeledStatementInstead = first = false;
		} while (!onlyOne && match.value == ',');

		if (this.ast) { //#ifdef FULL_AST
			// remove empty array
			if (!stack.length) pstack.length = pstack.length-1;
			pstack.numberOfExpressions = parsedExpressions;
			if (pstack[0]) pstack[0].numberOfExpressions = parsedExpressions;
			stack.expressionCount = parsedExpressions;
		}		return match;
	},
