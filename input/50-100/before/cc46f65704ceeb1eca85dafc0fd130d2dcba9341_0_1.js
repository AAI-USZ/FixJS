function(obj) {
        if (typeof obj === "undefined" || obj === null || (typeof obj === "number" && isNaN(obj))) {
            return false;
        } else if (obj.constructor === Array) {
            return "array";
        } else {
            return typeof obj;
        }
    }