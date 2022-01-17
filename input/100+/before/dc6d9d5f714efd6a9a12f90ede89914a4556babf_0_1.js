function(e){
        var callback, node, name, val, gravy, error = null, success = null;

        node  = $(e.target);
        val = e.target.value;
        gravy = this.gravy;

        /*
        *
        * Invoke 'clear' callback if node value is empty.
        *
        */
        if ( !this._v && !val.length ) {
            if (!gravy.clear && !this[this._r.clear] )
                throw new Error("[Gravy] Unable to find clear callback!");

            return this[gravy.clear || this._r.clear].apply(this, [node]);
        }

        name  = e.target.name;

        /*
        *
        * End execution if name is not found in gravy.
        *
        */
        if ( !gravy[name] )
            return console.error("[Gravy] Did not find " + name + " in gravy hash");

        callback = this._validateNode(name,val);

        return this._applyCallback(callback, node);
    }