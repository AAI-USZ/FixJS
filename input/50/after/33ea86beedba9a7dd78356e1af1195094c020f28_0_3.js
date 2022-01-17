function(value, attr, maxValue) {
            if (!isNumber(value) || value > maxValue) {
                return format(messages.max, sentenceCase(attr), maxValue);
            }
        }