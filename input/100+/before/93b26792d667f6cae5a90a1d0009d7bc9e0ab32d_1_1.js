function (parent, properties) {
        if (parent !== null && typeof (parent) != "function") {
            properties = parent;
            parent = null;
        }

        var initializer = null;
        var descriptors = properties ? {} : null;
        if (descriptors != null) {
            var ownPropertyNames = Object.getOwnPropertyNames(properties);
            for (var i = 0, n = ownPropertyNames.length; i < n; i++) {
                var name = ownPropertyNames[i];
                var value = properties[name];
                if (name == "initialize") {
                    initializer = value;
                }
                else if (name.indexOf("get_") === 0) {
                    // our std lib contains collision: hasNext property vs hasNext as function, we prefer function (actually, it does work)
                    var getterName = name.substring(4);
                    if (!descriptors.hasOwnProperty(getterName)) {
                        descriptors[getterName] = {get: value};
                        descriptors[name] = {value: value};
                    }
                }
                else if (name.indexOf("set_") === 0) {
                    descriptors[name.substring(4)] = {set: value};
                    // std lib code can refers to
                    descriptors[name] = {value: value};
                }
                else {
                    // we assume all our std lib functions are open
                    descriptors[name] = {value: value, writable: true};
                }
            }
        }

        return Kotlin.createClass(parent || null, initializer, descriptors);
    }