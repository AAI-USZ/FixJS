function (Parent, def) {
        var key;

        function Class() {
            var obj;

            // Call the Mixin constructor
            if (this && this.__class__) {
                Class.prototype.constructor.apply(this, arguments);
                return this;
            }

            // Create new object if the `new` keyword was not used.  Check
            // against `global` for Node.js, and `window` for browser side
            // JavaScript.
            if (this instanceof Class) {
                obj = this;
            } else {
                obj = objectCreate(Class.prototype);
            }

            obj.__class__ = Class;
            obj.__super__ = Parent.prototype;

            // Call the constructor
            if (typeof obj.constructor === 'function') {
                obj.constructor.apply(obj, arguments);
            }

            // Return the constructed object if `new` keyword was not used.
            return obj;
        }

        // Inherit static properties
        for (key in Parent) {
            if (Parent.hasOwnProperty(key) && Parent[key] !== Self[key]) {
                Class[key] = Parent[key];
            }
        }

        // Use differential inheritance
        Class.prototype = objectCreate(Parent.prototype);

        // Helper property & methods
        Class.__super__ = Parent.prototype;
        Class.extend = makeExtendMethod(Class);
        Class.mixin = makeMixinMethod(Class);
        Class.staticProps = makeStaticPropsMethod(Class);

        // Copy class definition into prototype
        for (key in def) {
            if (!Object.hasOwnProperty(key)) {
                if (
                    typeof def[key] === 'function' &&
                    keys(def[key]).length === 0 &&
                    keys(def[key].prototype).length === 0
                ) {
                    Class.prototype[key] = wrapMethodWithSelf(def[key]);
                } else {
                    Class.prototype[key] = def[key];
                }
            }
        }

        return Class;
    }