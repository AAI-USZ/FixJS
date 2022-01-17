function isDecimalNumber (stream, backup) {
        if (backup === true) {
            stream.backUp(1);
        }
        return stream.match(decimalMatcher);
    }