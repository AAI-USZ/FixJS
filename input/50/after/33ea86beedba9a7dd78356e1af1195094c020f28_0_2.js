function(value, attr, minValue) {
            if (!isNumber(value) || value < minValue) {
                return format(messages.min, sentenceCase(attr), minValue);
            }
        }