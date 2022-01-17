function(e){
        var callback, clear, node, name, val, gravy, error = null, success = null;

        node  = $(e.target);
        val = e.target.value;
        gravy = this.gravy;

        /*
        *
        * Invoke 'clear' callback if node value is empty.
        *
        * Some trickery used in finding the clear method.
        *       
        * If gravy does not exist in the gravy object and
        * is not a function, try to find the function in 
        * the view.
        *
        * Throw error if unable to find anything.
        *
        */
        if ( !this._v && !val.length ) {
            if ( !(clear = gravy.clear) && 
                 !(clear = _.isFunction(clear) ?
                   clear : this[gravy.clear] || this[this._r.clear]) )
                throw new Error("[Gravy] Unable to find clear callback!");

            return clear.apply(this, [node]);
        }

        name  = e.target.name;

        /*
        *
        * End execution if name is not found in gravy.
        *
        */
        if ( !gravy[name] )
            return console.log("[Gravy] Did not find " + name + " in gravy hash");

        callback = this._validateNode(name,val);

        return this._applyCallback(callback, node);
    }