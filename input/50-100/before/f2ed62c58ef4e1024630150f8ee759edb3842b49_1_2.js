function () {
            var self = this;

            if (!this.collection)
                this.collection = new veos.model.Reports();

            // TODO: consider binding 'add' and 'remove' to pick up added/removed Reports too?
            this.collection.on('reset', _.bind(this.render, self)); 
        }