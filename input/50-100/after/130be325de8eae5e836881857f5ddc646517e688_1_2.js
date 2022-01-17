function (value, key) {
                    var valueFn = value.filter || _.identity,
                        actual;

                    if (_.has(sample, key)) {
                        actual = valueFn(sample[key]);
                    } else {
                        actual = valueFn(undefined);
                    }

                    Object.defineProperty(self, key, {
                        value: actual,
                        writable: false,
                        enumerable: true
                    });
                }