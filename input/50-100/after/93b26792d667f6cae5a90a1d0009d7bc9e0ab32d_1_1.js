function (initializer, members) {
        var definition = Object.create(null, members === null ? undefined : members);
        if (initializer === null) {
            return {value: definition};
        }
        else {
            var getter = createPackageGetter(definition, initializer);
            Object.freeze(getter);
            return {get: getter};
        }
    }