function (value) {
            if (comb.isInstanceOf(value, Buffer)) {
                return value;
            } else if (Array.isArray(value) || comb.isString(value)) {
                return new Buffer(value);
            } else {
                throw new Error("Invalid value for blob " + value);
            }
        }