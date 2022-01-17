function(value, attr, maxLength) {
            if (!hasValue(value) || trim(value).length > maxLength) {
                return format(messages.maxLength, attr, maxLength);
            }
        }