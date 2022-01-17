function parseSealedArrayInitialiser() {
        var result = parseArrayInitialiser();
        result.sealed = true;
        return result;
    }