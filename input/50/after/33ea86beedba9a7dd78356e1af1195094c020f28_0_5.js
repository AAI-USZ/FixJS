function(value, attr, minLength) {
            if (!hasValue(value) || trim(value).length < minLength) {
                return format(messages.minLength, sentenceCase(attr), minLength);
            }
        }