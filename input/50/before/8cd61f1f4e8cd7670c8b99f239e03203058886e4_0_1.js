function (input) {
        if (input === null || input === "") {
            return null;
        }
        return new Money(input);
    }