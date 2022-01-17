function (value, key) {
                    var valueFn = value.filter || _.identity,
                        val;
                    if (_.has(sample, key)) {
                        val = sample[key];
                    }
                    self[key] = valueFn(val);
                    origValues[key] = self[key];
                }