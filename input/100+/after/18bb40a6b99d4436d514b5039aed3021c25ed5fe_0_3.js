function parseExportDeclaration() {
        var id, token, declaration, specifiers;

        expectKeyword('export');

        token = lookahead();

        if (token.type === Token.Keyword || (token.type === Token.Identifier && token.value === 'module')) {
            switch (token.value) {
            case 'function':
                return {
                    type: Syntax.ExportDeclaration,
                    declaration: parseFunctionDeclaration()
                };
            case 'module':
                return {
                    type: Syntax.ExportDeclaration,
                    declaration: parseModuleDeclaration()
                };
            case 'let':
            case 'const':
                return {
                    type: Syntax.ExportDeclaration,
                    declaration: parseConstLetDeclaration(token.value)
                };
            case 'var':
                return {
                    type: Syntax.ExportDeclaration,
                    declaration: parseStatement()
                };
            }
            throwUnexpected(lex());
        }

        specifiers = [ parseExportSpecifier() ];
        if (match(',')) {
            while (index < length) {
                if (!match(',')) {
                    break;
                }
                lex();
                specifiers.push(parseExportSpecifier());
            }
        }

        consumeSemicolon();

        return {
            type: Syntax.ExportDeclaration,
            specifiers: specifiers
        };
    }