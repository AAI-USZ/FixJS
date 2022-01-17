function peekLineTerminator(skip) {
        var pos, line, start, found, previousTokenLine;
        skip = skip || 0;

        pos = index;
        previousTokenLine = line = lineNumber;
        start = lineStart;
        while (skip--) {
            advance();
            previousTokenLine = lineNumber;
        }
        skipComment();
        found = lineNumber !== previousTokenLine;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }