function (object, options, callback) {

    if (_.isFunction(options)) {

        callback = options;
        options  = {};
    }

    var errs = [];

    // If we already have a function instead, just execute it.
    if (this.fn) {

        var result = this.fn(object, options);

        if (_.isBoolean(result)) {

            if (!result)
                errs.push(new errors.ValidationError(this.type + ' error',
                                                     'INVALID'));

        } else {
            errs = errs.concat(result.errors);
        }

    } else {

        // Look through each piece of the schema and validate it.
        _.each(this.schema, function (value, key) {

            var type        = value;

            // Determine whether this validator should be applied.
            var opts        = {};

            // Must use the object form instead.
            if (!_.isString(value)) {

                type                    = value.type;
                opts                    = value;
            }

            var objectVal = object[key],
                validator = validators[type];

            // Check required.
            if (_.isUndefined(objectVal) || _.isNull(objectVal)) {

                if (opts.required) {
                    return errs.push(new errors.ValidationError(key + ' was required',
                                                            'MISSING_KEY'));
                }

            } else {

                if (validator) {

                    errs = errs.concat(validator.validate(objectVal, opts).errors);

                } else {
                    var error = new errors.ValidationError(key + ' validator not found',
                                                           'SCHEMA_NOT_FOUND');
                    errs.push(error);
                }
            }
        });
    }

    var output = { valid     : _.isEmpty(errs),
                   errors    : errs };


    if (callback) {
        return callback(null, output);
    } else {
        return output;
    }
}