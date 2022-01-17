function(block) {
        var scanner = this.scanner;
        if (scanner.next === 'real') {
            block.codes.push({
                line: scanner.line,
                value: scanner.word,
                type: 'pushValue'
            });
            scanner.advance();
        } else if (scanner.next === 'string') {
            block.codes.push({
                line: scanner.line,
                value: scanner.word,
                type: 'pushValue'
            });
            scanner.advance();
        } else if (scanner.next === 'bool') {
            block.codes.push({
                line: scanner.line,
                value: scanner.word,
                type: 'pushValue'
            });
            scanner.advance();
        } else if (scanner.next === 'word') {
            var symbol = this.search(scanner.word);
            if (!symbol) {
                throw parserError(scanner, 'Symbol not found: ' + scanner.word);
            }
            scanner.advance();
            if (symbol.sub) {
                if (symbol.sub.kind !== 'function') {
                    throw parserError(scanner, 'Sub is not a function.');
                }
                var argc = this.parseArguments(block);
                if (symbol.sub.args !== undefined && argc !== symbol.sub.args) {
                    throw parserError(scanner, 'Mismatched arguments on: ' + symbol.sub.name);
                }
                block.codes.push({
                    line: scanner.line,
                    value: symbol.sub,
                    args: argc,
                    type: 'callAndPushResult'
                });
            } else {
                block.codes.push({
                    line: scanner.line,
                    level: symbol.level,
                    variable: symbol.name,
                    type: 'pushVariable'
                });
            }
        } else if (scanner.next === 'openBracket') {
            scanner.advance();
            while (scanner.next !== 'closeBracket') {
                this.parseExpression(block);
                if (scanner.next !== 'comma') {
                    break;
                }
                scanner.advance();
            }
            block.codes.push({
                line: scanner.line,
                type: 'endIndex'
            });
            if (scanner.next !== 'closeBracket') {
                throw parserError(scanner, 'Mismatched brackets.');
            }
            scanner.advance();
        } else if (scanner.next === 'openAbs') {
            scanner.advance();
            this.parseExpression(block);
            this.writeOperation(block, 'absolute', 1);
            if (scanner.next !== 'closeAbs') {
                throw parserError(scanner, 'Mismatched absolute, \"|)\" is required.');
            }
        } else if (scanner.next === 'openParen') {
            this.parseParentheses(block);
        } else {
            throw parserError(scanner, 'This is not a valid expression term.');
        }
    }