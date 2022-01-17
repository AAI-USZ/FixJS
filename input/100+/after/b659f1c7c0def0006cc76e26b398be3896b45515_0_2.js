function parsePropertyMethodFunction(options) {
        var token, previousStrict, param, params, paramSet, method;

        previousStrict = strict;
        strict = true;
        params = [];

        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead();
                param = parseVariableIdentifier();
                if (isRestrictedWord(token.value)) {
                    throwError(token, Messages.StrictParamName);
                }
                if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                    throwError(token, Messages.StrictParamDupe);
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

        method = parsePropertyFunction(params, { generator: options.generator });

        strict = previousStrict;

        return method;
    }