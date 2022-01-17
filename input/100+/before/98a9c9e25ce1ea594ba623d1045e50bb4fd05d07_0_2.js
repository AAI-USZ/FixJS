function(validation, attr) {
        return _.isObject(validation) && _.isObject(validation[attr]) && _.isObject(validation[attr].validation);
    }