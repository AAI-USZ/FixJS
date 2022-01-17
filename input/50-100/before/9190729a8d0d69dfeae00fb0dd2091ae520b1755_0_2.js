function parseClassDeclaration() {
        var token, id, body, subclassOf;

        expectKeyword('class');

        token = lookahead();
        id = parseVariableIdentifier();

        if (matchKeyword('extends')) {
            expectKeyword('extends');
            subclassOf = parseAssignmentExpression();
        }

        body = parseClassBody();
        return {
            id: id,
            type: Syntax.ClassDeclaration,
            body: body,
            subclassOf: subclassOf
        };
    }