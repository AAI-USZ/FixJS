function parseProgramElement() {
        var token = lookahead();

        if (token.type === Token.Keyword || (token.type === Token.Identifier && token.value === 'module')) {
            switch (token.value) {
            case 'module':
                if (lookahead2().type === Token.Identifier && !peekLineTerminator(1)) {
                    return parseModuleDeclaration(token.value);
                } else {
                    break;
                }
            case 'export':
                return parseExportDeclaration();
            case 'import':
                return parseImportDeclaration();
            }
        }

        return parseSourceElement();
    }