function __get__() {

    arguments.varName = arguments[0];

    if (typeof arguments.varName !== "string" || arguments.varName.length === 0) {

        throw new TypeError("__get__ expects a non-empty string");

    }



    return eval(arguments.varName);

}