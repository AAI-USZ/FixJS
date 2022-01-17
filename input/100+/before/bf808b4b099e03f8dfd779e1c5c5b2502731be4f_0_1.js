function parse(tokens) {

	var mode = 'top-level';

	var i = -1;

	var token;



	var stylesheet = new Stylesheet;

	var stack = [stylesheet];

	var rule = stack[0];



	var consume = function(advance) {

		if(advance === undefined) advance = 1;

		i += advance;

		if(i < tokens.length)

			token = tokens[i];

		else

			token = new EOFToken;

		return true;

	};

	var reprocess = function() {

		i--;

		return true;

	}

	var next = function() {

		return tokens[i+1];

	};

	var switchto = function(newmode) {

		if(newmode === undefined) {

			if(rule.fillType !== '')

				mode = rule.fillType;

			else if(rule.ruleType == 'STYLESHEET')

				mode = 'top-level'

			else { console.log("Unknown rule-type while switching to current rule's content mode: ",rule); mode = ''; }

		} else {

			mode = newmode;

		}

		return true;

	}

	var push = function(newRule) {

		rule = newRule;

		stack.push(rule);

		return true;

	}

	var parseerror = function(msg) {

		console.log("Parse error at token " + i + ": " + token + ".\n" + msg);

		return true;

	}

	var pop = function() {

		var oldrule = stack.pop();

		rule = stack[stack.length - 1];

		rule.append(oldrule);

		return true;

	}

	var discard = function() {

		stack.pop();

		rule = stack[stack.length - 1];

		return true;

	}

	var finish = function() {

		while(stack.length > 1) {

			pop();

		}

	}



	for(;;) {

		consume();



		switch(mode) {

		case "top-level":

			switch(token.tokenType) {

			case "CDO":

			case "CDC":

			case "WHITESPACE": break;

			case "AT-KEYWORD": push(new AtRule(token.value)) && switchto('at-rule'); break;

			case "{": parseerror("Attempt to open a curly-block at top-level.") && consumeAPrimitive(); break;

			case "EOF": finish(); return stylesheet;

			default: push(new StyleRule) && switchto('selector') && reprocess();

			}

			break;



		case "at-rule":

			switch(token.tokenType) {

			case ";": pop() && switchto(); break;

			case "{":

				if(rule.fillType !== '') switchto(rule.fillType);

				else parseerror("Attempt to open a curly-block in a statement-type at-rule.") && switchto('next-block') && reprocess();

				break;

			case "EOF": finish(); return stylesheet;

			default: rule.appendPrelude(consumeAPrimitive());

			}

			break;



		case "rule":

			switch(token.tokenType) {

			case "WHITESPACE": break;

			case "BADSTRING":

			case "BADURL": parseerror("Use of BADSTRING or BADURL token in selector.") && switchto('next-block'); break;

			case "}": pop() && switchto(); break;

			case "AT-KEYWORD": push(new AtRule(token.value)) && switchto('at-rule'); break;

			case "EOF": finish(); return stylesheet;

			default: push(new StyleRule) && switchto('selector') && reprocess();

			}

			break;



		case "selector":

			switch(token.tokenType) {

			case "{": switchto('declaration'); break;

			case "EOF": discard() && finish(); return stylesheet;

			default: rule.appendSelector(consumeAPrimitive()); 

			}

			break;



		case "declaration":

			switch(token.tokenType) {

			case "WHITESPACE":

			case ";": break;

			case "}": pop() && switchto(); break;

			case "AT-RULE": push(new AtRule(token.value)) && switchto('at-rule'); break;

			case "IDENT": push(new Declaration(token.value)) && switchto('after-declaration-name'); break;

			case "EOF": finish(); return stylesheet;

			default: parseerror() && switchto('next-declaration');

			}

			break;



		case "after-declaration-name":

			switch(token.tokenType) {

			case "WHITESPACE": break;

			case ":": switchto('declaration-value'); break;

			case ";": parseerror("Incomplete declaration - semicolon after property name.") && discard() && switchto(); break;

			case "EOF": discard() && finish(); return stylesheet;

			default: parseerror("Invalid declaration - additional token after property name") && discard() && switchto('next-declaration');

			}

			break;



		case "declaration-value":

			switch(token.tokenType) {

			case "DELIM":

				if(token.value == "!" && next().tokenType == 'IDENTIFIER' && next().value.toLowerCase() == "important") {

					consume();

					rule.important = true;

					switchto('declaration-end');

				} else {

					rule.append(token);

				}

				break;

			case ";": pop() && switchto(); break;

			case "}": pop() && switchto() && reprocess(); break;

			case "EOF": finish(); return stylesheet;

			default: decl.append(consumeAPrimitive());

			}

			break;



		case "declaration-end":

			switch(token.tokenType) {

			case "WHITESPACE": break;

			case ";": pop() && switchto(); break;

			case "}": pop() && switchto() && reprocess(); break;

			case "EOF": finish(); return stylesheet;

			default: parseerror("Invalid declaration - additional token after !important.") && discard() && switchto('next-declaration');

			}

			break;



		case "next-block":

			switch(token.tokenType) {

			case "{": consumeAPrimitive() && switchto(); break;

			case "EOF": finish(); return stylesheet;

			default: consumeAPrimitive(); break;

			}

			break;



		case "next-declaration":

			switch(token.tokenType) {

			case ";": switchto('declaration'); break;

			case "}": switchto('declaration') && reprocess(); break;

			case "EOF": finish(); return stylesheet;

			default: consumeAPrimitive(); break;

			}

			break;



		default:

			// If you hit this, it's because one of the switchto() calls is typo'd.

			console.log('Unknown parsing mode: ' + mode);

			return;

		}

	}


	function consumeAPrimitive() {

		switch(token.tokenType) {

		case "{":

		case "[":

		case "{": return consumeASimpleBlock();

		case "FUNCTION": return consumeAFunc();

		default: return token;

		}

	}



	function consumeASimpleBlock() {

		var endingTokenType = {"(":")", "[":"]", "{":"}"}[token.tokenType];

		var block = new SimpleBlock(token.tokenType);



		for(;;) {

			consume();

			switch(token.tokenType) {

			case "EOF":

			case endingTokenType: return block;

			default: block.append(consumeAPrimitive());

			}

		}

	}



	function consumeAFunc() {

		var func = new Func(token.value);

		var arg = new FuncArg();



		for(;;) {

			consume();

			switch(token.tokenType) {

			case "EOF":

			case ")": func.append(arg); return func;

			case "DELIM":

				if(token.value == ",") {

					func.append(arg);

					arg = new FuncArg();

				} else {

					arg.append(token);

				}

				break;

			default: arg.append(consumeAPrimitive());

			}

		}

	}

}
