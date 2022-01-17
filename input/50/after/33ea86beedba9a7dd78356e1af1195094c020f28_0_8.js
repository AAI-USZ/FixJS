function(value, attr, equalTo, model, computed) {
            if(value !== computed[equalTo]) {
                return format(messages.equalTo, sentenceCase(attr), sentenceCase(equalTo));
            }
        }