function(session, row) {
        var tokens = session.getTokens(row);
        var value = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type.indexOf("meta.tag") === 0)
                value += token.value;
            else
                value += lang.stringRepeat(" ", token.value.length);
        }
        
        return this._parseTag(value);
    }