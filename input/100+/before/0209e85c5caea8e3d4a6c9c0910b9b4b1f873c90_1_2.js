function create() {
            var parent = null, properties = $A(arguments);
            if (typeof (properties[0]) == "function") {
                parent = properties.shift();
            }

            function klass() {
                this.initializing = klass;
                if (this.initialize) {
                    this.initialize.apply(this, arguments);
                }
            }

            Object.extend(klass, METHODS);
            klass.superclass = parent;
            klass.subclasses = [];

            if (parent) {
                subclass.prototype = parent.prototype;
                klass.prototype = new subclass();
                parent.subclasses.push(klass);
            }

            klass.addMethods(
                {
                    get_class: function () {
                        return klass;
                    }
                });

            if (parent !== null) {
                klass.addMethods(
                    {
                        super_init: function () {
                            this.initializing = this.initializing.superclass;
                            this.initializing.prototype.initialize.apply(this, arguments);
                        }
                    });
            }

            for (var i = 0, length = properties.length; i < length; i++) {
                klass.addMethods(properties[i]);
            }

            if (!klass.prototype.initialize) {
                klass.prototype.initialize = emptyFunction;
            }

            klass.prototype.constructor = klass;
            return klass;
        }