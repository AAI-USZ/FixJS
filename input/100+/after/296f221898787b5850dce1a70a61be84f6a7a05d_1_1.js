function(level, args, addingResult) {
        var scanner = this.scanner.clone();
        var currentScope = this.frame[this.frame.length - 1];
        var current = 0;
        var variable = 0;
        var blocks = this.blocks;
        
        if (addingResult) {
            currentScope.result = {
                level: level,
                sub: null,
                variable: variable
            };
            ++variable;
        }

        if (args) {
            for (var i=0, length=args.length; i<length; ++i) {
                currentScope.scope[args[i]] = {
                    level: level,
                    sub: null,
                    variable: variable,
                    name: args[i]
                };
                ++variable;
            }
        }
        
        while (current >= 0 && scanner.next) {
            if (scanner.next === 'openBrace') {
                ++current;
                scanner.advance();
            } else if (scanner.next === 'closeBrace') {
                --current;
                scanner.advance();
            } else if (FunctionTypes[scanner.next]) {
                var type = scanner.next;
                scanner.advance();
                if (!current) {
                    if (currentScope.scope[scanner.word]) {
                        throw parserError(scanner, 'A routine is defined twice.');
                    }
                    var kind = (type === 'SUB' || type === 'at') ? 'sub' : 
                        (type === 'FUNCTION' ? 'function' : 'microthread');
                    var symbol = {
                        level: level,
                        sub: newBlock(blocks, level + 1, kind),
                        name: scanner.word,
                        func: null,
                        variable: -1
                    };
                    symbol.sub.name = scanner.word;
                    symbol.sub.func = null;
                    symbol.sub.args = 0;
                    currentScope.scope[scanner.word] = symbol;
                    scanner.advance();
                    if (kind !== 'sub' && scanner.next === 'openParen') {
                        scanner.advance();
                        while (scanner.next === 'word' || scanner.next === 'LET' || scanner.next === 'REAL') {
                            ++symbol.sub.args;
                            if (scanner.next === 'LET' || scanner.next === 'REAL') {
                                scanner.advance();
                            }
                            if (scanner.next === 'word') {
                                scanner.advance();
                            }
                            if (scanner.next !== 'comma') {
                                break;
                            }
                            scanner.advance();
                        }
                    }
                }
            } else if (VariableTypes[scanner.next]) {
                scanner.advance();
                if (!current) {
                    if (scanner.word === 'result') {
                        if (currentScope.scope[scanner.word]) {
                            throw parserError(scanner, "Variables with the same name are declared in the same scope");
                        }
                    }
                    currentScope.scope[scanner.word] = {
                        level: level,
                        sub: null,
                        variable: variable,
                        name: scanner.word
                    };
                    ++variable;
                    scanner.advance();
                }
            } else if (scanner.next === 'word') {
                var word = scanner.word;
                scanner.advance();
                if (scanner.next === 'openBrace' && !current) {
                    var symbol = {
                        level: level,
                        sub: newBlock(blocks, level + 1, 'namespace'),
                        name: word,
                        variable: -1
                    };
                    symbol.sub.name = word;
                    currentScope.scope[word] = symbol;
                }
            } else {
                scanner.advance();
            }
        }
    }