function checkSomeGlobals() {

    if (typeof global !== "object") {

        throw new ReferenceError("global is not an object");

    }

    if (typeof console !== "object") {

        throw new ReferenceError("console is not an object");

    }

    if (typeof require !== "function") {

        throw new ReferenceError("require is not a function");

    }

    if (typeof module !== "object") {

        throw new ReferenceError("module is not an object");

    }

    if (typeof exports !== "object") {

        throw new ReferenceError("exports is not an object");

    }

    if (module.exports !== exports) {

        throw new Error("module.exports === exports returns false");

    }

    if (typeof __dirname !== "string") {

        throw new ReferenceError("__dirname is not a string");

    }

    if (typeof __filename !== "string") {

        throw new ReferenceError("__filename is not a string");

    }

    //TODO add accurate checks here

    if (typeof setTimeout === "undefined") {

        throw new ReferenceError("setTimeout is undefined");

    }

    if (typeof clearTimeout === "undefined") {

        throw new ReferenceError("clearTimeout is undefined");

    }

    if (typeof setInterval === "undefined") {

        throw new ReferenceError("setInterval is undefined");

    }

    if (typeof clearInterval === "undefined") {

        throw new ReferenceError("clearInterval is undefined");

    }

    if (typeof Error === "undefined") {

        throw new ReferenceError("Error is undefined");

    }

    if (typeof parseFloat === "undefined") {

        throw new ReferenceError("parseFloat is undefined");

    }

    if (typeof parseInt === "undefined") {

        throw new ReferenceError("parseInt is undefined");

    }

    if (typeof window === "undefined") {

        if (typeof process === "undefined") {

            throw new ReferenceError("process is undefined");

        }

        if (typeof Buffer === "undefined") {

            throw new ReferenceError("Buffer is undefined");

        }

    } else {

        if (typeof encodeURIComponent === "undefined") {

            throw new ReferenceError("encodeURIComponent is undefined");

        }

        if (typeof decodeURIComponent === "undefined") {

            throw new ReferenceError("decodeURIComponent is undefined");

        }

    }

}