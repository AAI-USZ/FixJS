function(value, attr, values) {
            if(!_.include(values, value)){
                return format(messages.oneOf, attr, values.join(', '));
            }
        }