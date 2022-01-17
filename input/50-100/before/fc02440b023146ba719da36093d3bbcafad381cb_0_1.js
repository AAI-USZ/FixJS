function (bindings, parents) {
        var key, squimBindings = {};

        for (key in bindings) {
            if (bindings.hasOwnProperty(key)) {
                squimBindings[key] = obj.squimify(bindings[key]);
            }
        }

        return new Env(bindings, parent);
    }