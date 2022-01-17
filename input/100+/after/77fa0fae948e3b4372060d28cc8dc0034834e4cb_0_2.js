function parseFunctionDeclaration() {
        var id, param, params = [], body, token, firstRestricted, message, previousStrict, previousYieldAllowed, paramSet, generator;

        expectKeyword('function');

        generator = false;
        if (match('*')) {
            lex();
            generator = true;
        }

        token = lookahead();

        id = parseVariableIdentifier();
        if (strict) {
            if (isRestrictedWord(token.value)) {
                throwError(token, Messages.StrictFunctionName);
            }
        } else {
            if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }

        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead();
                param = parseVariableIdentifier();
                if (strict) {
                    if (isRestrictedWord(token.value)) {
                        throwError(token, Messages.StrictParamName);
                    }
                    if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                        throwError(token, Messages.StrictParamDupe);
                    }
                } else if (!firstRestricted) {
                    if (isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamName;
                    } else if (isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictReservedWord;
                    } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamDupe;
                    }
                }
                params.push(param);
                paramSet[param.name] = true;
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        previousStrict = strict;
        previousYieldAllowed = yieldAllowed;
        yieldAllowed = generator;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (yieldAllowed && !yieldFound) {
            throwError({}, Messages.NoYieldInGenerator);
        }
        strict = previousStrict;
        yieldAllowed = previousYieldAllowed;

        return {
            type: Syntax.FunctionDeclaration,
            id: id,
            params: params,
            body: body,
            generator: generator
        };
    }