function (value, key) {

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

            if ((_.isUndefined(objectVal) || _.isNull(objectVal)) && opts.required) {

                return errs.push(new errors.ValidationError(key + ' was required',
                                                            'MISSING_KEY'));
            }

            if (validator) {

                errs = errs.concat(validator.validate(objectVal, opts).errors);

            } else {
                var error = new errors.ValidationError(key + ' validator not found',
                                                       'SCHEMA_NOT_FOUND');
                errs.push(error);
            }
        }