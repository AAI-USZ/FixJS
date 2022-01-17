function (sample) {
                var self = this,
                    sample = sample || {},
                    origValues = {}; // we hold the old object against this.

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
                    var valueFn = value.filter || _.identity,
                        val;
                    if (_.has(sample, key)) {
                        val = sample[key];
                    }
                    self[key] = valueFn(val);
                    origValues[key] = self[key];
                });

                // override with_: the actual object may have been mutated, so we
                // need to use a fallback.
                self.with_ = function (adjustProperties) {
                    var sample = {},
                        changed = false;
                    _.each(propList, function (value, key) {
                        var valueFn = value.filter || undefined,
                            strictEqual = value.strictEqual || undefined,
                            rawValue, 
                            value;

                        if (Object.hasOwnProperty.call(adjustProperties, key)) {
                            rawValue = adjustProperties[key];

                            if (valueFn) { 
                                value = valueFn(rawValue); 
                            } else { 
                                value = rawValue; 
                            }

                            if (strictEqual) {
                                changed = changed || !strictEqual(value, origValues[key]);
                            } else {
                                changed = changed || (value !== origValues[key]);
                            }

                            sample[key] = value;
                        } else {
                            sample[key] = origValues[key];
                        } 
                    });

                    if (!changed) { return self; }
                    return new constructor(sample);
                };
            }