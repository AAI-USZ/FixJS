function () {
            var self = this;

            if (!this.collection) {
                this.collection = new veos.model.Installations();
            }

            // TODO: consider binding 'add' and 'remove' to pick up added/removed Installations too?
            this.collection.on('reset', _.bind(this.render, self)); 
        }