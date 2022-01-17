function () {
            this.collectionEvents = {
                'add remove reset': this.updateList,
                'change': this.updateRow
            };
            
            _.each(this.options.behaviors, function (behavior) {
                var b;
                if(_.isFunction(behavior)) {
                    b = new behavior();
                } else {
                    b = new behavior.behavior();
                    _.extend(b, behavior.options);
                }
                b.setGrid(this);
                this.behaviors.push(b);
            }, this);
            if(this.options.collection) {
                this.setCollection(this.options.collection);
            }
            
            if(this.options.columns) {
                this.columns = this.options.columns;
            }
            
            if(this.options.rowTemplate) {
                this.rowTemplate = this.options.rowTemplate;
            }
            
            this.trigger('initialized');
        }