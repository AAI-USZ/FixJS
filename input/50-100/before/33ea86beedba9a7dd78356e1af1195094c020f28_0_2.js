function(value, attr, required, model) {
            var isRequired = _.isFunction(required) ? required.call(model) : required;
            if(!isRequired && !hasValue(value)) {
                return false; // overrides all other validators
            }
            if (isRequired && !hasValue(value)) {
                return format(messages.required, attr);
            }
        }