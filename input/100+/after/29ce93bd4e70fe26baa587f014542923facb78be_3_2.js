function(Data) {

    var INTEGER = /^\d+$/;

    var FLOAT = /^(?:\d*\.\d+|\d+\.\d*)$/;
    
    var SYMBOL = /^[a-zA-Z\!\@\#\$\%\^\&\*\-\_\=\+\-\?\*\/\!\<\>][a-zA-Z0-9\!\@\#\$\%\^\&\*\-\_\=\+\-\?\*\/\!\<\>]*$/;
    
    
    function ReifyError(type, message) {
        this.type = type;
        this.message = message;
    }
    
    
    ReifyError.prototype = new Error();
    ReifyError.prototype.constructor = ReifyError;


    ReifyError.prototype.toString = function() {
        return this.type + " in reification: " + this.message;
    };

    

    function reifySymbol(str) {
        var value;
        
        if (value = str.match(INTEGER)) {
            return Data.Number(Number(value[0]));
        }

        if (value = str.match(FLOAT)) {
            return Data.Number(Number(value[0]));
        }

        if (value = str.match(SYMBOL)) {
            return Data.Symbol(str);
        }

        throw new ReifyError("ValueError", "can't reify symbol from string <" + str + ">");
    }


    // SExpression -> BeagleObject
    //   where the sexpression is either a list, string, or symbol
    //   and the BeagleObject is either a List, Symbol, or Number
    function makePrimitives(sexpr) {
        var i, value, elems, c, chars;

        if (sexpr.type === 'list') {
            elems = sexpr.value.map(function(s) {
                return makePrimitives(s);
            });

            return Data.List(elems);
        }

        if (sexpr.type === "string") {
        	return Data.String(sexpr.value);
        }

        if (sexpr.type === 'symbol') {
            return reifySymbol(sexpr.value);
        }

        throw new ReifyError("TypeError", "unrecognized s-expression type: " + sexpr.type);
    }


    return {
        makePrimitives: makePrimitives
    };

}