function checkSomeGlobals() {

    if (typeof global === "undefined") {

        throw new ReferenceError("global is undefined");

    }

    if (typeof console === "undefined") {

        throw new ReferenceError("console is undefined");

    }

    if (typeof __filename === "undefined") {

        throw new ReferenceError("__filename is undefined");

    }

    if (typeof __dirname === "undefined") {

        throw new ReferenceError("__dirname is undefined");

    }

    if (typeof setTimeout === "undefined") {

        throw new ReferenceError("setTimeout is undefined");

    }

}