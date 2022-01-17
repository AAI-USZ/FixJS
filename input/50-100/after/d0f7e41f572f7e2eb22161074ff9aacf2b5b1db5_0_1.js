function() {
        var res;
        if (op === "typeof" || op === "void" || op === "delete") {
            res = op + " " + t;
        } else {
            res = op + t;
        }
        if (BSJSTranslator.comparePriorities(prevOp, "u" + op)) {
            res = "(" + res + ")";
        }
        return res;
    }