function _getFunctionName(hostEditor, pos) {
        var token = hostEditor._codeMirror.getTokenAt(pos);
        
        // If the pos is at the beginning of a name, token will be the 
        // preceding whitespace or dot. In that case, try the next pos.
        if (token.string.trim().length === 0 || token.string === ".") {
            token = hostEditor._codeMirror.getTokenAt({line: pos.line, ch: pos.ch + 1});
        }
        
        // Return valid function expressions only (function call or reference)
        if (!((token.className === "variable")
              || (token.className === "variable-2")
              || (token.className === "property"))) {
            return null;
        }
        
        return token.string;
    }