function(attributes, options) {
        var defaults;
        if (options) {
            this.options = cloner.clone(options);
        }
        // debugger;
        for (prop in this) {
            if (typeof this[prop] == 'object') {
                this[prop] = cloner.clone(this[prop]);
            }
        }

        this.initialize.apply(this, arguments);
    }