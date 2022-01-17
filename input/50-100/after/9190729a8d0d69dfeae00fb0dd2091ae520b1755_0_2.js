function parseClassDeclaration() {
        var token, id, body, previousYieldAllowed, subclassOf;

        expectKeyword('class');

        token = lookahead();
        id = parseVariableIdentifier();

        if (matchKeyword('extends')) {
            expectKeyword('extends');
            previousYieldAllowed = yieldAllowed;
            yieldAllowed = false;
            subclassOf = parseAssignmentExpression();
            yieldAllowed = previousYieldAllowed;
        }

        body = parseClassBody();
        return {
            id: id,
            type: Syntax.ClassDeclaration,
            body: body,
            subclassOf: subclassOf
        };
    }