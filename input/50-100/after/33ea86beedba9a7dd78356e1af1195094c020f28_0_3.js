function(value, attr, range) {
            if(!isNumber(value) || value < range[0] || value > range[1]) {
                return format(messages.range, sentenceCase(attr), range[0], range[1]);
            }
        }