function(value, attr) {
            if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
                return format(messages.acceptance, attr);
            }
        }