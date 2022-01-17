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

    if (typeof setTimeout !== "function") {

        throw new ReferenceError("setTimeout is not a function");

    }

    if (typeof clearTimeout !== "function") {

        throw new ReferenceError("clearTimeout is not a function");

    }

    if (typeof setInterval !== "function") {

        throw new ReferenceError("setInterval is not a function");

    }

    if (typeof clearInterval !== "function") {

        throw new ReferenceError("clearInterval is not a function");

    }

    if (typeof Error !== "function") {

        throw new ReferenceError("Error is not a function");

    }

    if (typeof parseFloat !== "function") {

        throw new ReferenceError("parseFloat is not a function");

    }

    if (typeof parseInt !== "function") {

        throw new ReferenceError("parseInt is not a function");

    }

    if (typeof window === "undefined") {

        if (typeof process !== "object") {

            throw new ReferenceError("process is not an object");

        }

        if (typeof Buffer !== "function") {

            throw new ReferenceError("Buffer is not a function");

        }

    } else {

        if (typeof encodeURIComponent !== "function") {

            throw new ReferenceError("encodeURIComponent is not a function");

        }

        if (typeof decodeURIComponent !== "function") {

            throw new ReferenceError("decodeURIComponent is not a function");

        }

        if (typeof document !== "object") {

            throw new ReferenceError("document is not an object");

        }

    }

}