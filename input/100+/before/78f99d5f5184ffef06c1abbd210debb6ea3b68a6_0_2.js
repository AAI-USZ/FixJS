function(updated) {
            var self = this,
                options = self.options,
                collection = options.collection,
                collectionMap = options.collectionMap;
            if (updated.collection && typeof options.collection !== 'undefined') {
                if (self.disable) {
                    self.disable();
                }
                if (collection) {
                    collection.load(options.collectionLoadArgs).done(function() {
                        var startingValue = self.getValue();
                        self.set('models', collectionMap(collection.models));
                        _.each(self.options.entries, function(entry) {
                            // use type coercion in case it's an int
                            if (entry.value == startingValue) {
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
                    });
                }
            }
        }