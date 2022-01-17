function (value, key) {
                    var valueFn = value.filter || _.identity;
                    self[key] = valueFn(sample[key] || undefined);
                }