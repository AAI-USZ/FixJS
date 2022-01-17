function forEach(fun /*, thisp*/) {
            var self = toObject(this),
                thisp = arguments[1],
                i = -1,
                length = self.length >>> 0;

            // If no callback function or if callback is not a callable function
            if (_toString.call(fun) != "[object Function]") {
                throw new TypeError(); // TODO message
            }

            while (++i < length) {
                if (i in self) {
                    // Invoke the callback function with call, passing arguments:
                    // context, property value, property key, thisArg object context
                    fun.call(thisp, self[i], i, self);
                }
            }
        }