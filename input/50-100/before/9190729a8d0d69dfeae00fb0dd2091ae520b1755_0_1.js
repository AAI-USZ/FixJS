f        var token, id, body, subclassOf;

        expectKeyword('class');

        if (!matchKeyword('extends') && !match('{')) {
            id = parseVariableIdentifier();
        }

        if (matchKeyword('extends')) {
            expectKeyword('extends');
            subclassOf = parseAssignmentExpression();
        }

        body = parseClassBody();
        return {
            id: id,
            type: Syntax.ClassExpression,
            body: body,
            subclassOf: subclassOf
        };
    }
