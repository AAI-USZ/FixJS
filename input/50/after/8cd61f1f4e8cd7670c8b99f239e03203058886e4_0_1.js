function (input) {
        if (input === null || input === "") {
            return null;
        }
        if (typeof input !== "number") {
            input = parseFloat(input);
        }
        return new Money(input);
    }