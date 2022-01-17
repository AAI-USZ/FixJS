function (stream, state) {
            if (state.indentStack == null && stream.sol()) {
                // update indentation, but only if indentStack is empty
                state.indentation = stream.indentation();
            }

            // skip spaces
            if (stream.eatSpace()) {
                return null;
            }
            var returnType = null;
            
            switch(state.mode){
                case "string": // multi-line string parsing mode
                    var next, escaped = false;
                    while ((next = stream.next()) != null) {
                        if (next == "\"" && !escaped) {
    
                            state.mode = false;
                            break;
                        }
                        escaped = !escaped && next == "\\";
                    }
                    returnType = STRING; // continue on in scheme-string mode
                    break;
                case "comment": // comment parsing mode
                    var next, maybeEnd = false;
                    while ((next = stream.next()) != null) {
                        if (next == "#" && maybeEnd) {
    
                            state.mode = false;
                            break;
                        }
                        maybeEnd = (next == "|");
                    }
                    returnType = COMMENT;
                    break;
                case "s-expr-comment": // s-expr commenting mode
                    state.mode = false;
                    if(stream.peek() == "(" || stream.peek() == "["){
                        // actually start scheme s-expr commenting mode
                        state.sExprComment = 0;
                    }else{
                        // if not we just comment the entire of the next token
                        stream.eatWhile(/[^/s]/); // eat non spaces
                        returnType = COMMENT;
                        break;
                    }
                default: // default parsing mode
                    var ch = stream.next();
        
                    if (ch == "\"") {
                        state.mode = "string";
                        returnType = STRING;
        
                    } else if (ch == "'") {
                        returnType = ATOM;
                    } else if (ch == '#') {
                        if (stream.eat("|")) {					// Multi-line comment
                            state.mode = "comment"; // toggle to comment mode
                            returnType = COMMENT;
                        } else if (stream.eat(/[tf]/)) {			// #t/#f (atom)
                            returnType = ATOM;
                        } else if (stream.eat(';')) {				// S-Expr comment
                            state.mode = "s-expr-comment";
                            returnType = COMMENT;
                        }
        
                    } else if (ch == ";") { // comment
                        stream.skipToEnd(); // rest of the line is a comment
                        returnType = COMMENT;
                    } else if (ch == "-"){
                        
                        if(!isNaN(parseInt(stream.peek()))){
                            stream.eatWhile(/[\/0-9]/);
                            returnType = NUMBER;
                        }else{                            
                            returnType = null;
                        }
                    } else if (isNumber(ch,stream)){
                        returnType = NUMBER;
                    } else if (ch == "(" || ch == "[") {
                        var keyWord = ''; var indentTemp = stream.column();
                        /**
                        Either 
                        (indent-word ..
                        (non-indent-word ..
                        (;something else, bracket, etc.
                        */
        
                        while ((letter = stream.eat(/[^\s\(\[\;\)\]]/)) != null) {
                            keyWord += letter;
                        }
        
                        if (keyWord.length > 0 && indentKeys.propertyIsEnumerable(keyWord)) { // indent-word
        
                            pushStack(state, indentTemp + INDENT_WORD_SKIP, ch);
                        } else { // non-indent word
                            // we continue eating the spaces
                            stream.eatSpace();
                            if (stream.eol() || stream.peek() == ";") {
                                // nothing significant after
                                // we restart indentation 1 space after
                                pushStack(state, indentTemp + 1, ch);
                            } else {
                                pushStack(state, indentTemp + stream.current().length, ch); // else we match
                            }
                        }
                        stream.backUp(stream.current().length - 1); // undo all the eating
                        
                        if(typeof state.sExprComment == "number") state.sExprComment++;
                        
                        returnType = BRACKET;
                    } else if (ch == ")" || ch == "]") {
                        returnType = BRACKET;
                        if (state.indentStack != null && state.indentStack.type == (ch == ")" ? "(" : "[")) {
                            popStack(state);
                            
                            if(typeof state.sExprComment == "number"){
                                if(--state.sExprComment == 0){
                                    returnType = COMMENT; // final closing bracket
                                    state.sExprComment = false; // turn off s-expr commenting mode
                                }
                            }
                        }
                    } else {
                        stream.eatWhile(/[\w\$_\-]/);
        
                        if (keywords && keywords.propertyIsEnumerable(stream.current())) {
                            returnType = BUILTIN;
                        }else returnType = null;
                    }
            }
            return (typeof state.sExprComment == "number") ? COMMENT : returnType;
        }