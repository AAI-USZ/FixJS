function(name, val) {
        var gravy   = this.gravy,
            success = null,
            error   = null,
            vKey    = gravy[name];

        /*
        *
        * Throw error if validator is not found.
        *
        * Validator can be a String, Function, or Object.
        *
        */
        if ( !(validator = vKey instanceof Object ?
               vKey : (this[vKey] || this.model[vKey])) ) 
            throw new Error("[Gravy] Unable to find validator for: " + name);

        /*
        *
        * If name points to an object, one or more custom rules for field.
        *
        * Check for validation methods in the gravy hash and model
        *
        */
        if ( _.isObject(validator) && !_.isFunction(validator) ) {

            success = validator.success;
            error   = validator.error;

            /*
            * The Horror!
            *
            * Checks View and Model for validation method.
            */
            if ( !(validator = validator.validator) &&
                 !(validator = this[validator] || this.model[validator]) )
                throw new Error("[Gravy] Unable to find validator for: " + name);
        } 

        /*
        *
        * Determine context of validator.
        *
        * If the validator was found in the view, call it from the view, if it
        * was found in the model, call it from the model.
        *
        * This ensures that model methods invoked within the model, access the
        * model rather than the view.
        *
        */
        return {
            result  : validator.apply(!!this[vKey] ? this : this.model, [val]),
            success : success || gravy.success || this[this._r.success],
            error   : error   || gravy.error || this[this._r.error]
        };
    }