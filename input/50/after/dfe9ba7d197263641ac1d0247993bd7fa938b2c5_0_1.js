function __get__() {

    arguments.varName = arguments[0];

    if (arguments.varName && typeof arguments.varName === "string") {

        return eval(arguments.varName);

    } else {

        throw new TypeError("__get__ expects a non-empty string");

    }

}