function(model, validation, attrs, computed, view, options) {
        if (!attrs) {
          return false;
        }
        var isValid = true, error;
        for (var validatedAttr in validation) {
            error = validateAttr(model, validation, validatedAttr, model.get(validatedAttr), computed);
            if (_.isUndefined(attrs[validatedAttr]) && error) {
                isValid = false;
                break;
            } else if(!error && view) {
                options.valid(view, validatedAttr, options.selector);
            }
            if (error !== false && hasChildValidaton(validation, validatedAttr)) {
                isValid = validateAll(model, validation[validatedAttr].validation, attrs[validatedAttr], computed);
            }
        }
        return isValid;
    }