function(e) {
        /*
        * Stop form submission.
        */
        e.preventDefault();

        var valid  = true,
            gravy  = this.gravy, 
            submit = gravy.submit,
            attrs  = {}, val, validator, node;

        this._v = true;

        /*
        *
        * Loop through gravy, if not reserved word invoke validation
        * on that element. Maintain net validation status.
        *
        * Apply the appropriate callback.
        *
        */
        for ( field in gravy ) {
            if ( !this._reserved(field) ) {
                node = this.$('#'+field);
                val = node.val();
                
                callback = this._validateNode(field, val);
                
                if ( !callback.result )
                    valid = false;

                attrs[field] = val;
                this._applyCallback(callback, node);
            }
        }

        this._v = false;

        /*
        *
        * If form is not valid and there is no
        * error callback. Do nothing.
        *
        */
        if ( !valid && !this[submit.error] ) return;

        /*
        *
        * If form is valid and there is no
        * success callback. Error.
        *
        * TODO: This is subject to change, may have a scenario where
        * you would want to simply validate the form but not 
        * do anything.
        *
        */
        if ( valid && !this[submit.success] ) 
            throw new Error("[Gravy] Unable to find submission success callback!");


        return this[!!valid ? submit.success : submit.error].apply(this, [attrs, $(e.target)]);
    }