function (sample) {
                var self = this,
                    sample = sample || {},
                    origValues = _.extend({}, sample);

                // microoptimisation 
                if (sample instanceof constructor) { 
                    return sample;
                }

                if (!(self instanceof constructor)) {
                    throw "Object must be instantiated with new.";
                }

                // we don't actually have any guarantee of immutability
                // in this scenario: we will have to rely on failure modes 
                // being caught in modern browsers.
                _.each(propList, function (value, key) {
                    var valueFn = value.filter || _.identity;
                    self[key] = valueFn(sample[key] || undefined);
                });
            }