function() {
        var res = x + " " + op + " " + y;
        if (prevOp != undefined && BSJSTranslator.opPriorities[prevOp] === undefined || BSJSTranslator.opPriorities[prevOp] < BSJSTranslator.opPriorities[op]) {
            res = "(" + res + ")";
        }
        return res;
    }