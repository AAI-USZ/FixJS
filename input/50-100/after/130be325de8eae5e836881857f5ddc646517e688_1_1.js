function (value, key) {
                    var valueFn = value.filter || _.identity
                    if (_.has(sample, key)) {
                        self[key] = valueFn(sample[key]);
                    } else {
                        self[key] = valueFn(undefined);
                    }
                }