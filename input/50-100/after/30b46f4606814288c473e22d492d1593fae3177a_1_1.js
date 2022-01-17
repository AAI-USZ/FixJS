function() {
        if (op === "typeof" || op === "void" || op === "delete") {
            return op + " " + t;
        } else {
            return op + t;
        }
    }