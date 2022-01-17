function (name, v) {
        if (name === undefined || typeof(name) !== "string") {
            throw new Error("addValidator requires a name to be specified as the first parameter");
        }

        if (v === undefined || typeof(v) !== "function") {
            throw new Error("addValidator requires a function as the second parameter");
        }

        if (staticValidators[name] === undefined) {
            staticValidators[name] = v;
        } else {
            throw new Error("Validator '" + name +"' already defined");
        }
    }