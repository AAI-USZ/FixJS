function(data) {
                var queryOffset = query.params.offset || 0, instance, results;
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
                return $.Deferred().resolve(results, data);
            }