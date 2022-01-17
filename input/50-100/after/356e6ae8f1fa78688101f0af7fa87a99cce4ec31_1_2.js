function() {
        var sources = Array.prototype.slice.call(arguments, 0),
            parent = this,
            child = function() { parent.apply(this, arguments); };

        // Fix instanceof
        child.prototype = new parent();

        // extend with new properties
        Pd.extend.apply(this, [child.prototype, parent.prototype].concat(sources));
        child.extend = this.extend;
        return child;
    }