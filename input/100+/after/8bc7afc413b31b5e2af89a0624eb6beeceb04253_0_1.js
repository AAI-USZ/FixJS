function(params) {
            var self = this, query = this.query.clone(),
                offset, limit, models, dfd;

            params = params || {};

            // siq/mesh issue #10 corner case 1 and 2
            if (!params.reload) {
                if (self._lastLoad && self._lastLoad.query === self.query &&
                        _.isEqual(self._lastLoad.params, params)) {
                    return self._lastLoad.dfd;
                }
            }

            query.params.offset = offset = params.offset || 0;

            if (typeof params.limit !== 'undefined') {
                query.limit(params.limit);
            }
            if (!query.params.limit && !params.reload && self.total > 0) {
                query.limit(self.total - offset);
            }
            limit = query.params.limit;

            if (params.offset == null && !params.reload && self.total != null) {
                return $.Deferred().resolve(self.models);
            }

            if (!params.reload) {
                models = self.models;
                while (models[query.params.offset]) {
                    query.params.offset++;
                    if (query.params.limit) {
                        query.params.limit--;
                        if (query.params.limit === 0) {
                            models = models.slice(offset, offset + limit);
                            return $.Deferred().resolve(models);
                        }
                    }
                }
            }

            if (query.params.offset === 0) {
                delete query.params.offset;
            }

            self._lastLoad = {
                dfd: dfd = $.Deferred(),
                params: params,
                query: self.query
            };

            query.execute().done(function(data) {
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
                dfd.resolve(results);
                self.trigger('update', self, results);
            });

            return dfd;
        }