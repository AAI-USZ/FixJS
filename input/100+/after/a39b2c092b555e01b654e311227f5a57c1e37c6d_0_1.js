f	var mode = 'top-level';
	var i = -1;
	var token;

	var stylesheet = new Stylesheet;
	var stack = [stylesheet];
	var rule = stack[0];
	var decl;

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
			if(rule.ruleType == 'SELECTOR-RULE' || (rule.ruleType == 'AT-RULE' && rule.fillType == 'declaration'))
				mode = 'declaration';
			else if(rule.ruleType == 'AT-RULE' && rule.fillType == 'rule')
				mode = 'rule';
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
	var createdecl = function(name) {
		decl = new Declaration(name);
		return true;
	}
	var discarddecl = function() {
		decl = undefined;
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
	var finish = function() {
		while(stack.length > 1) {
			pop();
		}
	}

	for(;;) {
		consume();

		if(token.tokenType == 'EOF') {
			finish();
			return stylesheet;
		}

		switch(mode) {
		case "top-level":
			switch(token.tokenType) {
			case "CDO":
			case "CDC":
			case "WHITESPACE": break;
			case "AT-KEYWORD": push(new AtRule(token.value)) && switchto('at-rule'); break;
			case "{": parseerror("Attempt to open a curly-block at top-level.") && consumeASimpleBlock(token); break;
			default: push(new SelectorRule) && switchto('selector') && reprocess();
			}
			break;

		case "at-rule":
			switch(token.tokenType) {
			case ";": pop() && switchto(); break;
			case "{":
				if(rule.fillType !== '') switchto(rule.fillType);
				else parseerror("Attempt to open a curly-block in a statement-type at-rule.") && switchto('next-block') && reprocess();
				break;
			case "[":
			case "(": rule.appendPrelude(consumeASimpleBlock(token)); break;
			case "FUNCTION": rule.appendPrelude(consumeAFunction(token)); break;
			default: rule.appendPrelude(token);
			}
			break;

		case "rule":
			switch(token.tokenType) {
			case "WHITESPACE": break;
			case "BADSTRING":
			case "BADURL": parseerror("Use of BADSTRING or BADURL token in selector.") && switchto('next-block'); break;
			case "}": pop() && switchto(); break;
			case "AT-KEYWORD": push(new AtRule(token.value)) && switchto('at-rule'); break;
			default: push(new SelectorRule) && switchto('selector') && reprocess();
			}
			break;

		case "selector":
			switch(token.tokenType) {
			case "{": switchto('declaration'); break;
			case "[":
			case "(": rule.appendSelector(consumeASimpleBlock(token)); break;
			case "FUNCTION": rule.appendSelector(consumeAFunction(token)); break;
			default: rule.appendSelector(token); 
			}
			break;

		case "declaration":
			switch(token.tokenType) {
			case "WHITESPACE":
			case ";": break;
			case "}": pop() && switchto(); break;
			case "AT-RULE": push(new AtRule(token.value)) && switchto('at-rule'); break;
			case "IDENT": createdecl(token.value) && switchto('after-declaration-name'); break;
			default: parseerror() && switchto('next-declaration');
			}
			break;

		case "after-declaration-name":
			switch(token.tokenType) {
			case "WHITESPACE": break;
			case ":": switchto('declaration-value'); break;
			case ";": parseerror("Incomplete declaration - semicolon after property name.") && discarddecl() && switchto(); break;
			default: parseerror("Invalid declaration - additional token after property name") && discarddecl() && switchto('next-declaration');
			}
			break;

		case "declaration-value":
			switch(token.tokenType) {
			case "{":
			case "[":
			case "(": decl.append(consumeASimpleBlock(token)); break;
			case "FUNCTION": decl.append(consumeAFunction(token)); break;
			case "DELIM":
				if(token.value == "!" && next().tokenType == 'IDENTIFIER' && next().value.toLowerCase() == "important") {
					consume();
					decl.important = true;
					switchto('declaration-end');
				} else {
					decl.append(token);
				}
				break;
			case ";": rule.append(decl) && discarddecl() && switchto(); break;
			case "}": rule.append(decl) && discarddecl() && pop() && switchto(); break;
			default: decl.append(token);
			}
			break;

		case "declaration-end":
			switch(token.tokenType) {
			case "WHITESPACE": break;
			case ";": rule.append(decl) && discarddecl() && switchto(); break;
			case "}": rule.append(decl) && discarddecl() && pop() && switchto(); break;
			default: parseerror("Invalid declaration - additional token after !important.") && discarddecl() && switchto('next-declaration');
			}
			break;

		case "next-block":
			switch(token.tokenType) {
			case "{": consumeASimpleBlock(token) && switchto(); break;
			case "[":
			case "(": consumeASimpleBlock(token); break;
			case "FUNCTION": consumeAFunction(token); break;
			default: break;
			}
			break;

		case "next-declaration":
			switch(token.tokenType) {
			case ";": switchto('declaration'); break;
			case "}": switchto('declaration') && reprocess(); break;
			case "{":
			case "[":
			case "(": consumeASimpleBlock(token); break;
			case "FUNCTION": consumeAFunction(token); break;
			default: break;
			}
			break;

		default:
			console.log('Unknown parsing mode: ' + mode);
		}
	}

	function consumeASimpleBlock(startToken) {
		var endingTokenType = {"(":")", "[":"]", "{":"}"}[startToken.tokenType];
		var block = new SimpleBlock(startToken.tokenType);

		for(;;) {
			consume();
			switch(token.tokenType) {
			case "EOF":
			case endingTokenType: return block;
			case "{":
			case "[":
			case "(": block.append(consumeASimpleBlock(token)); break;
			case "FUNCTION": block.append(consumeAFunction(token)); break;
			default: block.append(token);
			}
		}
	}

	function consumeAFunction(startToken) {
		var func = new Function(startToken.value);
		var arg = new FunctionArg();

		for(;;) {
			consume();
			switch(token.tokenType) {
			case "EOF":
			case ")": func.append(arg); return func;
			case "DELIM":
				if(token.value == ",") {
					func.append(arg);
					arg = new FunctionArg();
				} else {
					arg.append(token);
				}
				break;
			case "{":
			case "[":
			case "(": arg.append(consumeASimpleBlock(token)); break;
			case "FUNCTION": arg.append(consumeAFunction(token)); break;
			default: arg.append(token);
			}
		}
	}
}
