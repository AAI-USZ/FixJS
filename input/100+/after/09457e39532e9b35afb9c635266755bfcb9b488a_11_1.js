function tokenBase(stream, state) {
        // Handle scope changes
        if (stream.sol()) {
            var scopeOffset = state.scopes[0].offset;
            if (stream.eatSpace()) {
                var lineOffset = stream.indentation();
                if (lineOffset > scopeOffset) {
                    return 'indent';
                } else if (lineOffset < scopeOffset) {
                    return 'dedent';
                }
                return null;
            } else {
                if (scopeOffset > 0) {
                    dedent(stream, state);
                }
            }
        }
        if (stream.eatSpace()) {
            return null;
        }

        var ch = stream.peek();

        // Handle docco title comment (single line)
        if (stream.match("####")) {
            stream.skipToEnd();
            return 'comment';
        }

        // Handle multi line comments
        if (stream.match("###")) {
            state.tokenize = longComment;
            return state.tokenize(stream, state);
        }

        // Single line comment
        if (ch === '#') {
            stream.skipToEnd();
            return 'comment';
        }

        // Handle number literals
        if (stream.match(/^-?[0-9\.]/, false)) {
            var floatLiteral = false;
            // Floats
            if (stream.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)) {
              floatLiteral = true;
            }
            if (stream.match(/^-?\d+\.\d*/)) {
              floatLiteral = true;
            }
            if (stream.match(/^-?\.\d+/)) {
              floatLiteral = true;
            }

            if (floatLiteral) {
                // prevent from getting extra . on 1..
                if (stream.peek() == "."){
                    stream.backUp(1);
                }
                return 'number';
            }
            // Integers
            var intLiteral = false;
            // Hex
            if (stream.match(/^-?0x[0-9a-f]+/i)) {
              intLiteral = true;
            }
            // Decimal
            if (stream.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)) {
                intLiteral = true;
            }
            // Zero by itself with no other piece of number.
            if (stream.match(/^-?0(?![\dx])/i)) {
              intLiteral = true;
            }
            if (intLiteral) {
                return 'number';
            }
        }

        // Handle strings
        if (stream.match(stringPrefixes)) {
            state.tokenize = tokenFactory(stream.current(), 'string');
            return state.tokenize(stream, state);
        }
        // Handle regex literals
        if (stream.match(regexPrefixes)) {
            if (stream.current() != '/' || stream.match(/^.*\//, false)) { // prevent highlight of division
                state.tokenize = tokenFactory(stream.current(), 'string-2');
                return state.tokenize(stream, state);
            } else {
                stream.backUp(1);
            }
        }

        // Handle operators and delimiters
        if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters)) {
            return 'punctuation';
        }
        if (stream.match(doubleOperators)
            || stream.match(singleOperators)
            || stream.match(wordOperators)) {
            return 'operator';
        }
        if (stream.match(singleDelimiters)) {
            return 'punctuation';
        }

        if (stream.match(constants)) {
            return 'atom';
        }

        if (stream.match(keywords)) {
            return 'keyword';
        }

        if (stream.match(identifiers)) {
            return 'variable';
        }

        // Handle non-detected items
        stream.next();
        return ERRORCLASS;
    }