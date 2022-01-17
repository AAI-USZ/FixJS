function() {
        if (t[0] === "binop") tx = "(" + tx + ")";
        if (op === "typeof" || op === "void" || op === "delete") {
            return op + " " + tx;
        } else {
            return op + tx;
        }
    }