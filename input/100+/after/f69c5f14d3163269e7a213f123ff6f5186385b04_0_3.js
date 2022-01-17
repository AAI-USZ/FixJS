function(model, attrs) {
        var result, error, attr,
            invalidAttrs = [],
            errorMessages = [],
            isValid = true,
            computed = _.clone(attrs);

        for (attr in attrs) {
            error = validateAttr(model, attr, attrs[attr], computed);
            if (error) {
                invalidAttrs.push(attr);
                errorMessages.push(error);
                isValid = false;
            }
        }

        return {
            invalidAttrs: invalidAttrs,
            errorMessages: errorMessages,
            isValid: isValid
        };
    }