function(value, attr, maxValue) {
            if (!isNumber(value) || value > maxValue) {
                return format(messages.max, attr, maxValue);
            }
        }