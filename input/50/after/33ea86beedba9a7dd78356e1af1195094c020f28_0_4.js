function(value, attr, length) {
            if (!hasValue(value) || trim(value).length !== length) {
                return format(messages.length, sentenceCase(attr), length);
            }
        }