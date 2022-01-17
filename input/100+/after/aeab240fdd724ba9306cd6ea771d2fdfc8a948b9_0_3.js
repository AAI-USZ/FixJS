function(models) {
            var model;
            if (!isArray(models)) {
                models = [models];
            }

            for (var i = 0, l = models.length; i < l; i++) {
                model = models[i];
                this.models.splice(_.indexOf(this.models, model), 1);
                if (model.id) {
                    delete this.ids[model.id];
                }
                if (model.cid) {
                    delete this.ids[model.cid];
                }
            }

            this.trigger('update', this, this.models);
            return this;
        }