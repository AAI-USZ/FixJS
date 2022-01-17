function (value, key) {
                    var valueFn = value.filter || _.identity;
                    Object.defineProperty(self, key, {
                        value: valueFn(sample[key] || undefined),
                        writable: false,
                        enumerable: true
                    });
                }