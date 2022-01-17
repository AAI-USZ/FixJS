function(parent, protoProperties, staticProperties) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProperties && protoProperties.hasOwnProperty('constructor')) {
            child = protoProperties.constructor;
        } else {
            child = function() {
                parent.call(this,
                    cloner.clone(protoProperties),
                    cloner.clone(staticProperties)
                );
            };
        }
        // Inherit class (static) properties from parent.
        child = cloner.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        baseConstructor.prototype = cloner.clone(parent.prototype);
        child.prototype = new baseConstructor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProperties) {
            child.prototype = cloner.extend(child.prototype, protoProperties);
        }

        // Add static properties to the constructor function, if supplied.
        if (staticProperties) {
            child = cloner.extend(child, staticProperties);
        }
        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // shortcut to element "class"
        child.prototype.__class__ = child.prototype

        // shortcut to parent prototype
        child.__super__ = parent.prototype;

        return child;
    }