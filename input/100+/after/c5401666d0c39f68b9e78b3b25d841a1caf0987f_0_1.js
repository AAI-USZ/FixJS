function(data) {
                var queryOffset = query.params.offset || 0, instance, results;

                // siq/mesh issue #10 corner case 3
                if (dfd !== self._lastLoad.dfd) {
                    return;
                }

                self.total = data.total;
                for (var i = 0, l = data.resources.length; i < l; i++) {
                    instance = data.resources[i];
                    self.models[queryOffset + i] = instance;
                    self.ids[instance.id] = instance;
                }
                if (limit) {
                    results = self.models.slice(offset, offset + limit);
                } else {
                    results = self.models.slice(offset);
                }
                self.trigger('update', self, results);
                dfd.resolve(results);
            }