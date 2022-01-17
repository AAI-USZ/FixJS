function(block) {
        var scanner = this.scanner;
        var blocks = this.blocks;
        for ( ; ; ) {
            var needSemicolon = true;
            if (scanner.next === 'word') {
                var symbol = this.search(scanner.word);
                if (!symbol) {
                    throw parserError(scanner, 'Symbol not found: ' + scanner.word);
                }
                scanner.advance();
                if (scanner.next === 'openBrace') {
                    this.parseBlock(symbol.sub);
                    needSemicolon = false;
                } else if (scanner.next === 'assign') {
                    scanner.advance();
                    this.parseExpression(block);
                    block.codes.push({ line: scanner.line, type: 'assign', 
                        level: symbol.level, variable: symbol.name });
                } else if (scanner.next === 'openBracket') {
                    block.codes.push({ line: scanner.line, type: 'pushVariable', 
                        level: symbol.level, variable: symbol.name });
                    scanner.advance();
                    this.parseExpression(block);
                    if (scanner.next !== 'closeBracket') {
                        throw parserError(scanner, 'Mismatched brackets, a \"]\" is required.');
                    }
                    scanner.advance();
                    this.writeOperation(block, 'index!', 2);
                    if (scanner.next !== 'assign') {
                        throw parserError(scanner, '...?');
                    }
                    block.codes.push({ line: scanner.line, type: 'assignWritable', 
                        level: symbol.level, variable: symbol.name });
                } else if (OperatorAssignTypes[scanner.next]) {
                    var type = scanner.next.substr(0, scanner.next.indexOf('Assign'));
                    scanner.advance();
                    block.codes.push({ line: scanner.line, type: 'pushVariable', 
                        level: symbol.level, variable: symbol.name });
                    this.parseExpression(block);
                    this.writeOperation(block, type, 2);
                    block.codes.push({ line: scanner.line, type: 'assign', 
                        level: symbol.level, variable: symbol.name });
                } else if (scanner.next === 'inc' || scanner.next === 'dec') {
                    var type = scanner.next === 'inc' ? 'successor' : 'predecessor';
                    scanner.advance();
                    block.codes.push({ line: scanner.line, type: 'pushVariable', 
                        level: symbol.level, variable: symbol.name });
                    this.writeOperation(block, type, 1);
                    block.codes.push({ line: scanner.line, type: 'assign', 
                        level: symbol.level, variable: symbol.name });

                } else {
                    if (!symbol.sub) {
                        throw parserError(scanner, '...?');
                    }
                    var argc = this.parseArguments(block);
                    if (symbol.sub.args !== undefined && argc !== symbol.sub.args) {
                        throw parserError(scanner, 'Wrong number of arguments: ' + symbol.sub.name);
                    }
                    block.codes.push({ line: scanner.line, type: 'call', 
                        value: symbol.sub, args: argc })
                }
            } else if (scanner.next === 'LET' || scanner.next === 'REAL') {
                scanner.advance();
                if (scanner.next !== 'word') {
                    throw parserError(scanner, 'Identifiers are required.');
                }
                var symbol = this.search(scanner.word);
                scanner.advance();
                if (scanner.next === 'assign') {
                    scanner.advance();
                    this.parseExpression(block);
                    block.codes.push({ line: scanner.line, type: 'let' });
                    block.codes.push({ line: scanner.line, type: 'assign', level: symbol.level, variable: symbol.name });
                }
            } else if (scanner.next === 'LOCAL') {
                scanner.advance();
                this.parseInlineBlock(block, 'normal');
                needSemicolon = false;
            } else if (scanner.next === 'LOOP') {
                scanner.advance();
                if (scanner.next === 'openParen') {
                    this.parseParentheses(block);
                    var length = block.codes.length;
                    block.codes.push({ line: scanner.line, type: 'loopCount' });
                    this.parseInlineBlock(block, 'loop');
                    block.codes.push({ line: scanner.line, type: 'loopBack', length: length });
                    block.codes.push({ line: scanner.line, type: 'pop' });
                } else {
                    var length = block.codes.length;
                    this.parseInlineBlock(block, 'loop');
                    block.codes.push({ line: scanner.line, type: 'loopBack', length: length });
                }
                needSemicolon = false;
            } else if (scanner.next === 'TIMES') {
                scanner.advance();
                this.parseParentheses(block);
                var length = block.codes.length;
                if (scanner.next === 'LOOP') {
                    scanner.advance();
                }
                block.codes.push({ line: scanner.line, type: 'loopCount' });
                this.parseInlineBlock(block, 'loop');
                block.codes.push({ line: scanner.line, type: 'loopBack', length: length });
                block.codes.push({ line: scanner.line, type: 'pop' });
            } else if (scanner.next === 'WHILE') {
                scanner.advance();
                var length = block.codes.length;
                this.parseParentheses(block);
                if (scanner.next === 'LOOP') {
                    scanner.advance();
                }
                block.codes.push({ line: scanner.line, type: 'loopIf' });
                this.parseInlineBlock(block, 'loop');
                block.codes.push({ line: scanner.line, type: 'loopBack', length: length });
                needSemicolon = false;
            } else if (scanner.next === 'ASCENT' || scanner.next === 'DESCENT') {
                var back = (scanner.next === 'DESCENT');
                scanner.advance();
                if (scanner.next !== 'openParen') {
                    throw parserError(scanner, '\"(\" is required');
                }
                scanner.advance();
                if (scanner.next === 'LET' || scanner.next === 'REAL') {
                    scanner.advance();
                }
                if (scanner.next !== 'word') {
                    throw parserError(scanner, 'Identifier Expected');
                }
                var word = scanner.word;
                scanner.advance();
                if (scanner.next !== 'IN') {
                    throw parserError(scanner, 'must be in');
                }
                scanner.advance();
                this.parseExpression(block);
                if (scanner.next !== 'range') {
                    throw parserError(scanner, '\"..\" is required in ASCENT/DESCENT');
                }
                scanner.advance();
                this.parseExpression(block);
                if (scanner.next !== 'closeParen') {
                    throw parserError(scanner, '"\")\" is required"');
                }
                scanner.advance();
                if (scanner.next === 'LOOP') {
                    scanner.advance();
                }
                var length = block.codes.length;
                block.codes.push({ line: scanner.line, type: back ? 'loopDescent' : 'loopAscent', variable: word });
                var nextBlock = newBlock(blocks, block.level + 1, 'loop');
                nextBlock.parent = block;
                block.children = block.children || [];
                block.children.push(nextBlock);
                this.parseBlock(nextBlock, [ word ], false);
                needSemicolon = false;
            } else if (scanner.next === 'IF') {
                scanner.advance();
                this.parseParentheses(block);
                block.codes.push({ line: scanner.line, type: 'caseIfNot' });
                this.parseInlineBlock(block, 'normal');
                while (scanner.next === 'ELSE') {
                    scanner.advance();
                    if (scanner.next === 'IF') {
                        scanner.advance();
                        this.parseParentheses(block);
                        block.codes.push({ line: scanner.line, type: 'caseElseIf' });
                        this.parseInlineBlock(block, 'normal');
                    } else {
                        block.codes.push({ line: scanner.line, type: 'caseElse' });
                        this.parseInlineBlock(block, 'normal');
                        break;
                    }
                }
                block.codes.push({ line: scanner.line, type: 'caseEnd' });
                needSemicolon = false;
            } else if (scanner.next === 'ALTERNATIVE') {
                scanner.advance();
                this.parseParentheses(block);
                block.codes.push({ line: scanner.line, type: 'alternative' });
                while (scanner.next === 'CASE') {
                    scanner.advance();
                    if (scanner.next !== 'openParen') {
                        throw parserError(scanner, '\"(\" is needed');
                    }
                    do {
                        scanner.advance();
                        this.parseExpression(block);
                    } while (scanner.next === 'comma');
                    if (scanner.next !== 'closeParen') {
                        throw parserError(scanner, '\")\" is needed');
                    }
                    scanner.advance();
                    block.codes.push({ line: scanner.line, type: 'caseStatement' });
                    this.parseInlineBlock(block, 'caseBlock');
                }
                if (scanner.next === 'OTHERS') {
                    block.codes.push({ line: scanner.line, type: 'caseOthers' });
                    scanner.advance();
                    this.parseInlineBlock(block, 'caseBlock');
                }
                block.codes.push({ line: scanner.line, type: 'alternativeEnd' });
                needSemicolon = false;
            } else if (scanner.next === 'BREAK') {
                scanner.advance();
                block.codes.push({ line: scanner.line, type: 'breakLoop' });
            } else if (scanner.next === 'RETURN') {
                scanner.advance();
                if (scanner.next === 'invalid' || scanner.next === 'semicolon' || scanner.next === 'closeBrace') {
                    break;
                } else {
                    this.parseExpression(block);
                    var symbol = this.searchResult();
                    if (!symbol) {
                        throw parserError(scanner, 'Symbol does not exist?');
                    }
                    block.codes.push({ line: scanner.line, type: 'assign', level: symbol.level, variable: symbol.name });
                }
                block.codes.push({ line: scanner.line, type: 'breakRoutine' });
            } else if (scanner.next === 'YIELD') {
                scanner.advance();
                block.codes.push({ line: scanner.line, type: 'yield' });
            } else if (FunctionTypes[scanner.next]) {
                var isEvent = scanner.next === 'at';
                scanner.advance();
                var symbol = this.search(scanner.word);
                if (isEvent) {
                    if (symbol.sub.level > 1 && block.kind !== 'namespace') {
                        throw parserError(scanner, '...?');
                    }
                    this.events[symbol.sub.name] = symbol.sub;
                }
                scanner.advance();
                var args = [];
                if (symbol.sub.kind !== 'sub') {
                    if (scanner.next === 'openParen') {
                        scanner.advance();
                        while (scanner.next === 'word' || scanner.next === 'LET' || scanner.next === 'REAL') {
                            if (scanner.next === 'LET' || scanner.next === 'REAL') {
                                scanner.advance();
                                if (scanner.next !== 'word') {
                                    throw parserError(scanner, 'Arguments are required.');
                                }
                            }
                            args.push(scanner.word);
                            scanner.advance();
                            if (scanner.next !== 'comma') {
                                break;
                            }
                            scanner.advance();
                        }
                        if (scanner.next !== 'closeParen') {
                            throw new Error ('\")\" is required.');
                        }
                        scanner.advance();
                    }
                } else {
                    if (scanner.next === 'openParen') {
                        scanner.advance();
                        if (scanner.next !== 'closeParen') {
                            throw new Error ('\")\" is required.');
                        }
                        scanner.advance();
                    }
                }
                this.parseBlock(symbol.sub, args, symbol.sub.kind === 'function');
                needSemicolon = false;
            } else if (scanner.next === 'comment') {
                this.comments.push(scanner.word);
                scanner.advance();
                needSemicolon = false;
            }
            if (needSemicolon && scanner.next !== 'semicolon') {
                break;
            }
            if (scanner.next === 'semicolon') {
                scanner.advance();
            }
        };
    }