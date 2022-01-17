function map(fun /*, thisp*/) {
            var self = toObject(this),
                length = self.length >>> 0,
                result = Array(length),
                thisp = arguments[1];

            // If no callback function or if callback is not a callable function
            if (_toString.call(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function");
            }

            for (var i = 0; i < length; i++) {
                if (i in self)
                    result[i] = fun.call(thisp, self[i], i, self);
            }
            return result;
        }