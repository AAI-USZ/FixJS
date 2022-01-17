function (value, key) {
                    var valueFn = value.filter || _.identity,
                        val;
                    if (_.has(sample, key)) {
                        val = sample[key];
                    }
                    Object.defineProperty(self, key, {
                        value: valueFn(val),
                        writable: false,
                        enumerable: true
                    });
                }