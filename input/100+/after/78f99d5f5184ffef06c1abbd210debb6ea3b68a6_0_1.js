function() {
                        var startingValue = _.isFunction(self.getValue)?  self.getValue() : null;

                        self.set('models', collectionMap(collection.models));
                        _.each(self.options.entries, function(entry) {
                            // use type coercion in case it's an int
                            if (_.isFunction(self.setValue) && entry.value == startingValue) {
                                self.setValue(startingValue);
                            }
                        });
                        if (self.enable) {
                            self.enable();
                        }

                        // handle any future updates
                        collection.on('update', function(evtName, collection) {
                            self.set('models', collection.models);
                        });
                    }