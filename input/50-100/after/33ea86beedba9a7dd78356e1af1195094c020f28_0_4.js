function(value, attr, range) {
            if(!hasValue(value) || trim(value).length < range[0] || trim(value).length > range[1]) {
                return format(messages.rangeLength, sentenceCase(attr), range[0], range[1]);
            }
        }