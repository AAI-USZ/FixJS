function(models, idx) {
            var self = this, model, newModels = [];
            if (!isArray(models)) {
                models = [models];
            }

            if (idx == null) {
                if (self.total != null) {
                    idx = self.total;
                } else {
                    idx = self.models.length;
                }
            }

            for (var i = 0, l = models.length; i < l; i++) {
                newModels.push(model = models[i]);
                this.models.splice(idx + 1, 0, model);
                if (model.id) {
                    this.ids[model.id] = model;
                } else if (model.cid) {
                    this.ids[model.cid] = model;
                }
            }

            this.trigger('update', this, newModels);
            return this;
        }