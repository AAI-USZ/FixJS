function(Data) {

    var INTEGER = /^\d+$/;

    var FLOAT = /^(?:\d*\.\d+|\d+\.\d*)$/;


    function reifySymbol(sexpr) {
        var value;

        if (value = sexpr.value.match(INTEGER)) {
            return Data.Number(Number(value[0]));
        }

        if (value = sexpr.value.match(FLOAT)) {
            return Data.Number(Number(value[0]));
        }

        if (sexpr.value.length > 0) {
            return Data.Symbol(sexpr.value);
        }

        // empty string is an error
        throw new Error("can't extract primitive:  symbol has empty value");
    }


    // SExpression -> BeagleObject
    //   where the BeagleObject is either a List, String, Symbol, or Number
    function makePrimitives(sexpr) {
        var i, value, elems;

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
            return reifySymbol(sexpr);
        }

        throw new Error("unrecognized s-expression type: " + sexpr.type);
    }


    return {
        makePrimitives: makePrimitives
    };

}