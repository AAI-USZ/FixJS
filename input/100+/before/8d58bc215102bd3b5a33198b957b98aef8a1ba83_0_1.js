function tokenBase(stream, state) {
        if (stream.eatSpace()) {
            return null;
        }
        
        var ch = stream.peek();
        
        // Handle Comments
        if (ch === "'") {
            stream.skipToEnd();
            return 'comment';
        }
        
        
        // Handle Number Literals
        if (stream.match(/^[0-9\.]/, false)) {
            var floatLiteral = false;
            // Floats
            if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
            if (stream.match(/^\d+\.\d*/)) { floatLiteral = true; }
            if (stream.match(/^\.\d+/)) { floatLiteral = true; }
            if (floatLiteral) {
                // Float literals may be "imaginary"
                stream.eat(/J/i);
                return 'number';
            }
            // Integers
            var intLiteral = false;
            // Hex
            if (stream.match(/^0x[0-9a-f]+/i)) { intLiteral = true; }
            // Binary
            if (stream.match(/^0b[01]+/i)) { intLiteral = true; }
            // Octal
            if (stream.match(/^0o[0-7]+/i)) { intLiteral = true; }
            // Decimal
            if (stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/)) {
                // Decimal literals may be "imaginary"
                stream.eat(/J/i);
                // TODO - Can you have imaginary longs?
                intLiteral = true;
            }
            // Zero by itself with no other piece of number.
            if (stream.match(/^0(?![\dx])/i)) { intLiteral = true; }
            if (intLiteral) {
                // Integer literals may be "long"
                stream.eat(/L/i);
                return 'number';
            }
        }
        
        // Handle Strings
        if (stream.match(stringPrefixes)) {
            state.tokenize = tokenStringFactory(stream.current());
            return state.tokenize(stream, state);
        }
        
        // Handle operators and Delimiters
        if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters)) {
            return null;
        }
        if (stream.match(doubleOperators)
            || stream.match(singleOperators)
            || stream.match(wordOperators)) {
            return 'operator';
        }
        if (stream.match(singleDelimiters)) {
            return null;
        }
        if (stream.match(doOpening)) {
            indent(stream,state);
            state.doInCurrentLine = true;
            return 'keyword';
        }
        if (stream.match(opening)) {
            if (! state.doInCurrentLine)
              indent(stream,state);
            else
              state.doInCurrentLine = false;
            return 'keyword';
        }
        if (stream.match(middle)) {
            return 'keyword';
        }

        if (stream.match(doubleClosing)) {
            dedent(stream,state);
            dedent(stream,state);
            return 'keyword';
        }
        if (stream.match(closing)) {
            dedent(stream,state);
            return 'keyword';
        }
        
        if (stream.match(types)) {
            return 'keyword';
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