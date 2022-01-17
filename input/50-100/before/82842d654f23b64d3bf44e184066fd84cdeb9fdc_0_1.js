function peekLineTerminator(skip) {
        var pos, line, start, found;
        skip = skip || 0;

        pos = index;
        line = lineNumber;
        start = lineStart;
        while (skip--) {
            advance();
        }
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }