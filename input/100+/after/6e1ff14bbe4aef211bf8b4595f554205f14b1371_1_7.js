function isFunctionCompatible(func1, func2) {
        return func1.mandatory === func2.mandatory && func1.optional >= func2.optional;
    }