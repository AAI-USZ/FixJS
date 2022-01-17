function(value, attr, pattern) {
            if (!hasValue(value) || !value.toString().match(patterns[pattern] || pattern)) {
                return format(messages.pattern, sentenceCase(attr), pattern);
            }
        }