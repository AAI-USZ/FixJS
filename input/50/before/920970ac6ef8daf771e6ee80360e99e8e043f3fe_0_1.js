function (text) {
            if (text.match(/^[^a-z\']/i)) {     // punctuation
                return makeTaggedString(text, [ analyzeSpace(text) ]);
            }
            return makeWord(text);             // word
        }