function parseProgramElement() {
        var token = lookahead();

        if (token.type === Token.Keyword) {
            switch (token.value) {
            case 'module':
                return parseModuleDeclaration(token.value);
            case 'export':
                return parseExportDeclaration();
            case 'import':
                return parseImportDeclaration();
            }
        }

        return parseSourceElement();
    }