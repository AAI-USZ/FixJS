function validateSync(observable, rule, ctx) {
        //Execute the validator and see if its valid
        if (!rule.validator(observable(), ctx.params || true)) { // default param is true, eg. required = true

            //not valid, so format the error message and stick it in the 'error' variable
            observable.error = ko.validation.formatMessage(ctx.message || rule.message, ctx.params);
            observable.__valid__(false);
            return false;
        } else {
            return true;
        }
    }