function(stream) {
        if (stream.match(/^.+:$/)) {
            return "variable-2";
        }
        if (stream.sol() && stream.match(/^\s*\.\w+/)) {
            return "header";
        }
        if (stream.sol() && stream.match(/^\s\w+/)) {
            return "keyword";
        }
        if (stream.eatSpace()) return null;
        var ch = stream.next();
        if (ch == '"' || ch == "'") {
            return tokenString(ch)(stream);
        }
        if (/[\[\]{}\(\),;\:]/.test(ch)) return null;
        if (/[\d$]/.test(ch) || (ch == '-' && stream.peek().match(/[0-9]/))) {
            stream.eatWhile(/[\w\.]/);
            return "number";
        }
        if (ch == '%') {
            stream.eatWhile(/\w+/);
            return "variable-3";
        }
        if (ch == '#') {
            stream.eatWhile(/.*/);
            return "comment";
        }
        stream.eatWhile(/[\w\$_]/);
        return "word";
    }