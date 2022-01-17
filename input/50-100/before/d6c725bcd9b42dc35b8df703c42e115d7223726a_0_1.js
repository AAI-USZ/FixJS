function add(object, source) {
            var properties = Object.keys(source);
            for (var i = 0, length = properties.length; i < length; i++) {
                var property = properties[i];
                object[property] = source[property];
            }
            return this;
        }